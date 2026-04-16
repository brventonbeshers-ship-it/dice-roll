interface DiceDisplayProps {
  value: number;
  size?: "sm" | "lg";
}

const DICE_FACES: Record<number, string> = {
  1: "\u2680",
  2: "\u2681",
  3: "\u2682",
  4: "\u2683",
  5: "\u2684",
  6: "\u2685",
};

export function DiceDisplay({ value, size = "sm" }: DiceDisplayProps) {
  const textSize = size === "lg" ? "text-7xl md:text-8xl" : "text-4xl";
  const face = DICE_FACES[value] || "";

  if (!value || value < 1 || value > 6) return null;

  return (
    <div className="text-center dice-reveal">
      <span className={`${textSize} drop-shadow-[0_0_16px_rgba(255,140,0,0.4)]`}>
        {face}
      </span>
    </div>
  );
}

// a11y: 1775828370115

// dice: 1775828557061

// dice: 1775871414530

// a11y: 1775871511983

// dice: 1775920410041

// a11y: 1775920480793

// dice: 1775966595883

// a11y: 1775966643259

// a11y: 1776046407046

// dice: 1776046627821

// dice: 1776062969652

// a11y: 1776063009484

// dice: 1776084001159

// a11y: 1776084135450

// dice: 1776116028792

// a11y: 1776116155310

// dice: 1776143818571

// a11y: 1776143879288

// dice: 1776170919925

// a11y: 1776170928327

// a11y: 1776186166555

// dice: 1776186353621

// a11y: 1776215113181

// dice: 1776215281098

// a11y: 1776247678803

// dice: 1776247873231

// a11y: 1776256315458

// dice: 1776256420015

// dice: 1776269731854

// a11y: 1776269878112

// a11y: 1776315514761

// dice: 1776315526308
