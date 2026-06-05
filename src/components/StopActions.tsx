"use client";

import { useCallback, useEffect, useState } from "react";
import { getVisitorCode } from "@/lib/visitor";
import { TreasureButton } from "./TreasureButton";

type ActionState = "idle" | "loading" | "success" | "error";

type StopActionsProps = {
  stopId: string;
  eventSlug: string;
  googleReviewUrl: string | null;
  compact?: boolean;
};

export function StopActions({
  stopId,
  eventSlug,
  googleReviewUrl,
  compact = false,
}: StopActionsProps) {
  const [visitorCode, setVisitorCode] = useState("");
  const [checkinState, setCheckinState] = useState<ActionState>("idle");
  const [redeemState, setRedeemState] = useState<ActionState>("idle");
  const [reviewState, setReviewState] = useState<ActionState>("idle");

  useEffect(() => {
    getVisitorCode().then(setVisitorCode);
  }, []);

  const postAction = useCallback(
    async (
      endpoint: string,
      setState: (s: ActionState) => void
    ) => {
      setState("loading");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventStopId: stopId, visitorCode }),
        });
        if (!res.ok) throw new Error("Request failed");
        setState("success");
      } catch {
        setState("error");
      }
    },
    [stopId, visitorCode]
  );

  const handleCheckin = () => postAction("/api/checkins", setCheckinState);
  const handleRedeem = () => postAction("/api/redemptions", setRedeemState);

  const handleReview = async () => {
    setReviewState("loading");
    try {
      await fetch("/api/review-clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventStopId: stopId, visitorCode }),
      });
      if (googleReviewUrl) {
        window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
      }
      setReviewState("success");
    } catch {
      setReviewState("error");
    }
  };

  const size = compact ? "sm" : "md";

  return (
    <div className={`flex ${compact ? "flex-wrap gap-2" : "flex-col gap-3"}`}>
      <TreasureButton
        size={size}
        variant="primary"
        onClick={handleCheckin}
        loading={checkinState === "loading"}
        disabled={checkinState === "success"}
        fullWidth={!compact}
      >
        {checkinState === "success" ? "Checked in!" : "Check In"}
      </TreasureButton>
      <TreasureButton
        size={size}
        variant="secondary"
        onClick={handleRedeem}
        loading={redeemState === "loading"}
        disabled={redeemState === "success"}
        fullWidth={!compact}
      >
        {redeemState === "success" ? "Redeemed!" : "Redeem Offer"}
      </TreasureButton>
      <TreasureButton
        size={size}
        variant="ghost"
        onClick={handleReview}
        loading={reviewState === "loading"}
        disabled={reviewState === "success"}
        fullWidth={!compact}
      >
        {reviewState === "success" ? "Review opened!" : "Google Review"}
      </TreasureButton>
      {!compact && (
        <TreasureButton
          size="sm"
          variant="ghost"
          href={`/events/${eventSlug}/stops/${stopId}`}
        >
          View stop details
        </TreasureButton>
      )}
    </div>
  );
}
