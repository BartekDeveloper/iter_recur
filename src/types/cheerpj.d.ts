export {};

declare global {
  function cheerpjInit(options?: CheerpJInitOptions): Promise<void>;

  function cheerpjCreateDisplay(width: number, height: number): void;

  function cheerpjRunJar(path: string): Promise<void>;

  function cheerpjRunMain(className: string, classPath: string): Promise<void>;

  function cheerpjRunLibrary(classPath: string): Promise<CJ3Library>;

  interface CheerpJInitOptions {
    version?: 8 | 11 | 17;
    status?: "splash" | "none" | "default";
    logCanvasUpdates?: boolean;
    preloadResources?: Record<string, number[]>;
    preloadProgress?: (done: number, total: number) => void;
    clipboardMode?: "permission" | "system" | "java";
    beepCallback?: () => void;
    enableInputMethods?: boolean;
    overrideShortcuts?: (evt: KeyboardEvent) => boolean;
    appletParamFilter?: (name: string, value: string) => string;
    natives?: Record<string, Function>;
    overrideDocumentBase?: string;
    javaProperties?: string[];
    enableDebug?: boolean;
    hostName?: string;
  }

  interface CJ3Library {
    getJNIDataView(): DataView;
  }
}