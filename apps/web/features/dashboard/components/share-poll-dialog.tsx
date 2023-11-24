import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Separator,
} from "@poll/ui";
import Image from "next/image";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { ShareSocial } from "../../../components/share-social";
import { routes } from "../../../config/routes";
import { useQRCode } from "../../../hooks/use-qr-code";

type DeletePollDialogProps = {
  pollId: string;
} & React.ComponentProps<typeof Dialog>;

export default function SharePollDialog({
  pollId,
  children,
  ...props
}: DeletePollDialogProps) {
  const shareUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}${routes.poll(pollId)}`;

  const {
    data: qrCodeSrc,
    isLoading,
    isError,
    refetch: refetchQRCode,
  } = useQRCode(shareUrl);

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        overlayClass="bg-none backdrop-blur-none">
        <DialogHeader>
          <DialogTitle>Share poll</DialogTitle>
        </DialogHeader>

        <div className="mb-4 mt-8 flex w-full flex-col items-center">
          <div className="flex h-40 w-40 items-center justify-center rounded border-2 border-neutral-800 p-0.5">
            {isLoading && (
              <Icon.Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
            )}
            {isError && (
              <div className="flex flex-col items-center space-y-2">
                <Icon.X className="h-6 w-6 text-red-500" />
                <Button
                  onClick={() => refetchQRCode()}
                  className="text-xs"
                  size="sm"
                  variant="text">
                  Try Again
                </Button>
              </div>
            )}
            {qrCodeSrc ? (
              <Image
                width={160}
                height={160}
                src={Buffer.from(qrCodeSrc).toString()}
                alt="poll share qr code"
              />
            ) : null}
          </div>
          <Separator className="my-12" />
          <div className="flex flex-wrap gap-4">
            <ShareSocial as={EmailShareButton} url={shareUrl}>
              <Icon.LucideMail />
            </ShareSocial>
            <ShareSocial as={FacebookShareButton} url={shareUrl}>
              <Icon.Facebook />
            </ShareSocial>
            <ShareSocial as={LinkedinShareButton} url={shareUrl}>
              <Icon.Linkedin />
            </ShareSocial>
            <ShareSocial as={RedditShareButton} url={shareUrl}>
              <Icon.Reddit />
            </ShareSocial>
            <ShareSocial as={TelegramShareButton} url={shareUrl}>
              <Icon.Telegram />
            </ShareSocial>
            <ShareSocial as={TwitterShareButton} url={shareUrl}>
              <Icon.Twitter />
            </ShareSocial>
            <ShareSocial as={WhatsappShareButton} url={shareUrl}>
              <Icon.Whatsapp />
            </ShareSocial>
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="text">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
