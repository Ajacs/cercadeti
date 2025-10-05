
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M26 13.3333C26 21.3333 16 30 16 30C16 30 6 21.3333 6 13.3333C6 10.6402 7.05357 8.05797 8.92893 6.1826C10.8043 4.30724 13.3866 3.25378 16 3.25378C18.6134 3.25378 21.1957 4.30724 23.0711 6.1826C24.9464 8.05797 26 10.6402 26 13.3333Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-2xl font-bold text-primary">CercaDeTi</span>
    </div>
  );
}
