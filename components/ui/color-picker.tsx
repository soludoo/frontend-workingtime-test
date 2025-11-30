/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Color from "color";
import { PipetteIcon } from "lucide-react";
import { Slider } from "radix-ui";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  mode: string;
  pickerSelectionChange: boolean;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: string) => void;
  setPickerSelectionChange: (value: boolean) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0];
  defaultValue?: Parameters<typeof Color>[0];
  onChange?: (value: Parameters<typeof Color.rgb>[0]) => void;
};

export const ColorPicker = ({
  value,
  defaultValue = "#000000",
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  const selectedColor = Color(value);
  const defaultColor = Color(defaultValue);

  const [hue, setHue] = useState(
    selectedColor.hue() || defaultColor.hue() || 0
  );
  const [saturation, setSaturation] = useState(
    selectedColor.saturationl() || defaultColor.saturationl() || 100
  );
  const [lightness, setLightness] = useState(
    selectedColor.lightness() || defaultColor.lightness() || 50
  );
  const [alpha, setAlpha] = useState(
    selectedColor.alpha() * 100 || defaultColor.alpha() * 100
  );
  const [mode, setMode] = useState("hex");
  const [pickerSelectionChange, setPickerSelectionChange] = useState(false);

  // Update color when controlled value changes
  useEffect(() => {
    if (value) {
      const color = Color.rgb(value).rgb().object();

      setHue(color.r);
      setSaturation(color.g);
      setLightness(color.b);
      setAlpha(color.a);
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
      const rgba = color.rgb().array();

      onChange([rgba[0], rgba[1], rgba[2], alpha / 100]);
    }
  }, [hue, saturation, lightness, alpha, onChange]);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        pickerSelectionChange,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
        setPickerSelectionChange,
      }}
    >
      <div
        className={cn("flex size-full flex-col gap-4", className)}
        {...(props as any)}
      />
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = memo(
  ({ className, ...props }: ColorPickerSelectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const { hue, setSaturation, setLightness, setPickerSelectionChange } =
      useColorPicker();

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${hue}, 100%, 50%)`;
    }, [hue]);

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (!(isDragging && containerRef.current)) {
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        );
        setPositionX(x);
        setPositionY(y);
        setSaturation(x * 100);
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
        const lightness = topLightness * (1 - y);

        setLightness(lightness);
        setPickerSelectionChange(true);
      },
      [isDragging, setSaturation, setLightness, setPickerSelectionChange]
    );

    const handlePointer = useCallback(
      (event: PointerEvent) => {
        if (!containerRef.current) {
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        );
        setPositionX(x);
        setPositionY(y);
        setSaturation(x * 100);
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
        const lightness = topLightness * (1 - y);

        setLightness(lightness);
        setPickerSelectionChange(true);
      },
      [setSaturation, setLightness, setPickerSelectionChange]
    );

    useEffect(() => {
      const handlePointerUp = () => setIsDragging(false);

      if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [isDragging, handlePointerMove]);

    return (
      <div
        className={cn(
          "relative size-full cursor-crosshair rounded-2xl",
          className
        )}
        onPointerDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          handlePointerMove(e.nativeEvent);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsDragging(true);
          const touch = e.touches[0];
          handlePointerMove({
            clientX: touch.clientX,
            clientY: touch.clientY,
          } as any);
        }}
        onClick={(e) => {
          e.preventDefault();
          handlePointer(e.nativeEvent as any);
        }}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...(props as any)}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
          style={{
            left: `${positionX * 100}%`,
            top: `${positionY * 100}%`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  }
);

ColorPickerSelection.displayName = "ColorPickerSelection";

export type ColorPickerHueProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { hue, setHue } = useColorPicker();

  return (
    <Slider.Root
      className={cn("relative flex h-4 w-full touch-none", className)}
      max={360}
      onValueChange={([hue]) => setHue(hue)}
      step={1}
      value={[hue]}
      {...(props as any)}
    >
      <Slider.Track className="relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <Slider.Range className="absolute h-full" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerAlphaProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { alpha, setAlpha } = useColorPicker();

  return (
    <Slider.Root
      className={cn("relative flex h-4 w-full touch-none", className)}
      max={100}
      onValueChange={([alpha]) => setAlpha(alpha)}
      step={1}
      value={[alpha]}
      {...(props as any)}
    >
      <Slider.Track
        className="relative my-0.5 h-3 w-full grow rounded-full"
        style={{
          background:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent to-black/50" />
        <Slider.Range className="absolute h-full rounded-full bg-transparent" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setHue(h);
      setSaturation(s);
      setLightness(l);
      setAlpha(100);
    } catch (error) {
      console.error("EyeDropper failed:", error);
    }
  };

  return (
    <Button
      className={cn("shrink-0 text-muted-foreground", className)}
      onClick={handleEyeDropper}
      size="icon"
      variant="outline"
      type="button"
      {...(props as any)}
    >
      <PipetteIcon size={16} />
    </Button>
  );
};

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>;

// const formats = ["hex", "rgb", "css", "hsl"];
const formats = ["hex", "rgb"];

export const ColorPickerOutput = ({ ...props }: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select onValueChange={setMode} value={mode}>
      <SelectTrigger className="h-8 w-20 shrink-0 text-xs" {...(props as any)}>
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem className="text-xs" key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type PercentageInputProps = ComponentProps<typeof Input>;

const PercentageInput = ({
  className,
  onChange,
  ...props
}: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        {...(props as any)}
        className={cn(
          "h-8 w-13 rounded-l-none bg-white px-2 text-xs shadow-none",
          className
        )}
        onChange={onChange}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-black text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const {
    hue,
    saturation,
    lightness,
    alpha,
    mode,
    pickerSelectionChange,
    setHue,
    setSaturation,
    setLightness,
    setAlpha,
    setPickerSelectionChange,
  } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);
  const [hexDraft, setHexDraft] = useState(color.hex());
  const [rgbDraft, setRgbDraft] = useState(
    color
      .rgb()
      .array()
      .map((value) => Math.round(value))
  );

  useEffect(() => {
    if (pickerSelectionChange) {
      setHexDraft(color.hex());
      setRgbDraft(
        color
          .rgb()
          .array()
          .map((value) => Math.round(value))
      );
      setPickerSelectionChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, pickerSelectionChange]);

  const applyColor = (c: any) => {
    const [h, s, l] = c.hsl().array();
    setHue(h);
    setSaturation(s);
    setLightness(l);
    setAlpha(Math.round(c.alpha() * 100));
    if (mode === "hex") {
      setRgbDraft(
        c
          .rgb()
          .array()
          .map((value: any) => Math.round(value))
      );
    }
    if (mode === "rgb") {
      setHexDraft(c.hex());
    }
  };

  if (mode === "hex") {
    return (
      <div
        className={cn(
          "-space-x-px relative flex w-full items-center rounded-md",
          className
        )}
        {...(props as any)}
      >
        <Input
          className="h-8 rounded-r-none bg-white px-2 text-xs shadow-none"
          type="text"
          value={hexDraft || ""}
          onChange={(e) => {
            let v = e.target.value;
            setHexDraft(v);
            if (!v.startsWith("#")) v = "#" + v;
            if (v.length < 4) return;
            try {
              const parsed = Color(v).alpha(alpha / 100);
              applyColor(parsed);
            } catch {}
          }}
        />
        <PercentageInput
          value={alpha || ""}
          onChange={(e) => setAlpha(e.target.value as any)}
        />
      </div>
    );
  }

  if (mode === "rgb") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn("-space-x-px flex items-center rounded-md", className)}
        {...(props as any)}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              "h-8 rounded-r-none bg-white px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className
            )}
            key={index}
            type="text"
            value={rgbDraft[index] || ""}
            onChange={(e) => {
              const next: any = [...rgbDraft];
              next[index] = e.target.value;
              setRgbDraft(next);

              const numeric = Number(e.target.value);
              if (isNaN(numeric) || numeric < 0 || numeric > 255) return;

              const parsed = Color.rgb([
                index === 0 ? numeric : rgb[0],
                index === 1 ? numeric : rgb[1],
                index === 2 ? numeric : rgb[2],
              ]).alpha(alpha / 100);

              applyColor(parsed);
            }}
          />
        ))}
        <PercentageInput
          value={alpha || ""}
          onChange={(e) => setAlpha(e.target.value as any)}
        />
      </div>
    );
  }

  return null;
};

export const ColorPreview = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, alpha, mode } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);

  function hexWithAlpha(hex: string, alpha: number) {
    const a = Math.round((alpha / 100) * 255)
      .toString(16)
      .padStart(2, "0");

    return `${hex}${a}`;
  }

  if (mode === "hex") {
    const hex = color.hex();

    return (
      <div
        className={cn(
          "-space-x-px relative flex w-full items-center rounded-full size-8 min-w-8 min-h-8",
          className
        )}
        style={{ background: hexWithAlpha(hex, alpha) }}
        {...(props as any)}
      />
    );
  }

  if (mode === "rgb") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));
    console.log(rgb, alpha);

    const opacity = alpha / 100;

    const background = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;

    return (
      <div
        className={cn(
          "-space-x-px flex items-center rounded-full size-8 min-w-8 min-h-8",
          className
        )}
        style={{ background }}
        {...(props as any)}
      ></div>
    );
  }

  return null;
};
