import path from 'path';
import { v4 as uuid } from 'uuid';
import puppeteer, { Browser } from 'puppeteer';
import { storagePaths } from '../config/storage';
import { DeviceProfile } from '../config/deviceProfiles';

export interface CaptureOptions {
  url: string;
  width: number;
  height: number;
  device: DeviceProfile;
  fullPage?: boolean;
}

export interface CaptureResult {
  fileName: string;
  relativePath: string;
  absolutePath: string;
  width: number;
  height: number;
}

export async function capturePage({ url, width, height, device, fullPage = true }: CaptureOptions): Promise<CaptureResult> {
  let browser: Browser | undefined;
  const fileName = `${uuid()}.png`;
  const relativePath = path.join('screenshots', fileName);
  const absolutePath = path.join(storagePaths.root, relativePath);

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: device.pixelRatio,
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: absolutePath,
      fullPage,
    });

    return {
      fileName,
      relativePath,
      absolutePath,
      width,
      height,
    };
  } catch (error) {
    throw new Error(`Failed to capture page: ${(error as Error).message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
