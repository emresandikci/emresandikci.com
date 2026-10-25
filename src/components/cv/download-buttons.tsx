import { LuChevronDown, LuDownload } from 'react-icons/lu';
import { CvMenu } from './cv-menu';

export function DownloadButtons() {
  return (
    <CvMenu triggerClassName="inline-flex items-center gap-2 rounded-full bg-heading px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent">
      <LuDownload className="size-4" />
      Download CV
      <LuChevronDown className="size-4" />
    </CvMenu>
  );
}
