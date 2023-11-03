import { cn } from "@poll/lib";
import {
  toast as _toast,
  type Toast,
  type Renderable,
  type ValueOrFunction,
} from "react-hot-toast";

export const toast = (
  message: ValueOrFunction<Renderable, Toast>,
  opts?:
    | Partial<
        Pick<
          Toast,
          | "id"
          | "icon"
          | "duration"
          | "ariaProps"
          | "className"
          | "style"
          | "position"
          | "iconTheme"
        >
      >
    | undefined
) =>
  _toast(message, {
    ...opts,
    className: cn(
      "!rounded [&_svg]:w-4 [&_svg]:h-4 flex text-sm",
      opts?.className
    ),
  });
