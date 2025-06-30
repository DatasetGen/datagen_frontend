export function addAlpha(color: string, opacity: number) {
    // coerce values so it is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

export function isImage(filePath: string): boolean {
    // Normalize path to avoid issues with different OS path separators
    const normalizedPath = filePath.replace(/\\/g, "/");

    // **Exclude system and temp files**
    if (
        normalizedPath.startsWith("__MACOSX/") || // macOS system files
        normalizedPath.startsWith(".") || // Hidden files at root
        normalizedPath.includes("/.") || // Hidden files in subdirectories
        normalizedPath.startsWith("~") || // Temp files (e.g., "~temp.png")
        normalizedPath.includes("/~") || // Temp files in subdirectories
        normalizedPath.endsWith(".tmp") || // Temporary files
        normalizedPath.endsWith(".bak") || // Backup files
        normalizedPath.includes("thumbs.db") || // Windows thumbnail cache
        normalizedPath.includes("desktop.ini") || // Windows system file
        normalizedPath.includes("._") // Mac resource fork files
    ) {
        return false;
    }

    // **Allowed image extensions**
    const imageExtensions = /\.(png|jpe?g|gif|bmp|webp|svg|tiff?|heic|avif)$/i;

    return imageExtensions.test(normalizedPath);
}
