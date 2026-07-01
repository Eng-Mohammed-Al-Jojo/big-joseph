
export default function MenuSkeleton() {
  const categories = [1, 2];

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Search Bar Skeleton */}
      <div className="w-full max-w-2xl mx-auto mb-8 animate-pulse">
        <div
          className="h-16 w-full rounded-full"
          style={{
            background: "rgba(251,248,243,0.50)",
            border: "1.5px solid rgba(139,103,38,0.10)",
            boxShadow: "0 4px 16px -4px rgba(139,103,38,0.07)"
          }}
        />
      </div>

      {/* Tabs / Navigation Skeleton */}
      <div className="flex gap-3 overflow-hidden pb-8 no-scrollbar snap-x animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="h-14 w-28 rounded-full shrink-0"
            style={{
              background: "rgba(251,248,243,0.45)",
              border: "1.5px solid rgba(139,103,38,0.08)"
            }}
          />
        ))}
      </div>

      {/* Categories Sections */}
      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat} className="space-y-6">

            {/* Section Header */}
            <div className="flex flex-col items-center gap-2 py-6 relative animate-pulse">
              <div
                className="h-8 w-1/3 rounded-xl"
                style={{ background: "rgba(139,103,38,0.10)" }}
              />
              <div className="mt-3 flex items-center gap-3">
                <div className="w-10 h-[1.5px]" style={{ background: "rgba(139,103,38,0.08)" }} />
                <div className="w-1.5 h-1.5 rounded-full rotate-45" style={{ background: "rgba(122, 28, 36, 0.25)" }} />
                <div className="w-10 h-[1.5px]" style={{ background: "rgba(139,103,38,0.08)" }} />
              </div>
            </div>

            {/* Rows List - Matching ItemRow layout exactly */}
            <div
              className="flex flex-col w-full overflow-hidden rounded-[2rem] animate-pulse"
              style={{
                background: "rgba(251,248,243,0.30)",
                border: "1px solid rgba(139,103,38,0.06)",
                boxShadow: "0 4px 16px -4px rgba(139,103,38,0.07)"
              }}
            >
              {[1, 2, 3].map((item, index) => (
                <div
                  key={item}
                  className="relative flex items-center justify-between w-full px-5 py-5 min-h-[88px]"
                  style={{
                    background: index % 2 === 0 ? "rgba(250,244,235,0.70)" : "rgba(251,248,243,0.70)",
                    borderBottom: index < 2 ? "1px solid rgba(139,103,38,0.04)" : "none"
                  }}
                >
                  {/* RIGHT SIDE: NAME + DESCRIPTION SKELETON */}
                  <div className="flex-1 text-right pr-1 space-y-2.5">
                    <div
                      className="h-5 w-2/5 rounded-full ml-auto"
                      style={{ background: "rgba(139,103,38,0.12)" }}
                    />
                    <div
                      className="h-3.5 w-3/5 rounded-full ml-auto"
                      style={{ background: "rgba(139,103,38,0.06)" }}
                    />
                  </div>

                  {/* LEFT SIDE: PRICE + ORDER BUTTON SKELETON */}
                  <div className="flex flex-col items-end shrink-0 min-w-[110px] gap-2.5">
                    <div className="h-5 w-12 rounded-full" style={{ background: "rgba(139,103,38,0.12)" }} />
                    <div className="h-7 w-20 rounded-full" style={{ background: "rgba(139,103,38,0.18)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
