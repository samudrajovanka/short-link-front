import { ShortLink } from '@/repositories/shortLink/types';

export type ConfirmDeleteModalProps = {
  isOpen: boolean;
  shortLink: ShortLink;
  onClose: () => void;
};