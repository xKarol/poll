import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Separator,
} from "@poll/ui";
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

import QRCode from "../../../components/qr-code";
import { ShareSocial } from "../../../components/share-social";
import { routes } from "../../../config/routes";
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
          <QRCode text={shareUrl} />
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
      </DialogContent>
    </Dialog>
  );
}
