// React
import { Link } from "react-router-dom";
// HeroUI
import { Card } from "@heroui/react";

export default function Empty({
  faIconName,
  description,
  destination,
  actionText,
  className,
  noActionBtn,
}) {
  return (
    <Card className="dark:bg-slate-700/60 transition-colors">
      <div
        className={`w-full min-h-68 flex justify-center items-center flex-col gap-4 ${className}`}
      >
        <div className="icon text-[26px] size-16">
          <i className={`fas fa-${faIconName}`}></i>
        </div>
        <div className="content items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400/80 transition-colors text-lg">
            {description}
          </p>
          {!noActionBtn && (
            <Link className="btn-secondary" to={destination}>
              {actionText}
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
