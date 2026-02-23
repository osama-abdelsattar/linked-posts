// React
import { Link } from "react-router-dom";
// HeroUI
import { Card } from "@heroui/react";
// Motion
import { motion } from "framer-motion";

export default function Empty({
  icon: Icon,
  description,
  destination,
  actionText,
  className,
  noActionBtn,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      children={[
        <Card
          key="emptyPost"
          className="dark:bg-slate-700/60 transition-colors"
        >
          <div
            className={`w-full min-h-68 flex justify-center items-center flex-col gap-4 ${className}`}
          >
            <div className="icon text-[26px] size-16">{Icon && <Icon />}</div>
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
      ]}
    />
  );
}
