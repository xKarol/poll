import { Loader2 } from "lucide-react";
import React from "react";

import { Button } from "../button";

export type LoadingButtonProps = { isLoading: boolean } & React.ComponentProps<
  typeof Button
>;

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, className, children, ...props }, ref) => {
    return (
      <Button
        className={className}
        ref={ref}
        {...props}
        disabled={props.disabled ?? isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
