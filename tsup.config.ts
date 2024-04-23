import { defineConfig } from "tsup";
import { rename, readdir, rmdir, mkdir } from "fs/promises";
import { existsSync } from "fs";

export default defineConfig({
    entry: ["src/index.ts"],
    target: "es2020",
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: "tmp",
    onSuccess: async () => {
        if (!existsSync("dist")) await mkdir("dist");

        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (!existsSync("tmp/index.d.ts")) return;

                clearInterval(interval);
                resolve();
            }, 10);
        });

        console.log("Build completed, moving files...");
        const files = await readdir("tmp");
        await Promise.all(
            files.map(async (file) => {
                await rename(`tmp/${file}`, `dist/${file}`);
            }),
        );
        await rmdir("tmp");
    },
});
