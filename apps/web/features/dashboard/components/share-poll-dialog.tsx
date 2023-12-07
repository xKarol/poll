import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
} from "@poll/ui";
import React, { useRef } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import QRCode from "../../../components/qr-code";
import { ShareSocial } from "../../../components/share-social";
import { routes } from "../../../config/routes";
import { useQRCode } from "../../../hooks/use-qr-code";
import { getBaseUrl } from "../../../utils/get-base-url";

type DeletePollDialogProps = {
  pollId: string;
} & React.ComponentProps<typeof Dialog>;

export default function SharePollDialog({
  pollId,
  children,
  ...props
}: DeletePollDialogProps) {
  const shareUrl = `${getBaseUrl()}${routes.poll(pollId)}`;
  const { data: qrCodeSrc } = useQRCode(shareUrl);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const downloadQRCode = (type: string) => {
    const downloadEl = downloadLinkRef.current;
    if (!downloadEl) return;
    downloadEl.href = qrCodeSrc;
    downloadEl.download = `qr.${type}`;
    downloadEl.click();
  };

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
          <QRCode
            className="rounded border-2 border-neutral-200 dark:border-neutral-800"
            text={shareUrl}
          />
          <div className="mt-4 flex space-x-4">
            <Select onValueChange={downloadQRCode}>
              <SelectTrigger>
                <Icon.Download className="h-4 w-4" />
                <span>Download</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
              </SelectContent>
            </Select>
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
              <Icon.XTwitter />
            </ShareSocial>
            <ShareSocial as={WhatsappShareButton} url={shareUrl}>
              <Icon.Whatsapp />
            </ShareSocial>
          </div>
        </div>
        <a ref={downloadLinkRef} hidden />
      </DialogContent>
    </Dialog>
  );
}
