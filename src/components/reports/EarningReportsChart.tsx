import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const data = [
  { name: "8 AM", earn: 106, spend: 175, vouchers: 195, customers: 142 },
  { name: "9 AM", earn: 203, spend: 175, vouchers: 38, customers: 142 },
  { name: "10 AM", earn: 106, spend: 175, vouchers: 142, customers: 221 },
  { name: "11 AM", earn: 106, spend: 221, vouchers: 38, customers: 14 },
  { name: "12 PM", earn: 221, spend: 175, vouchers: 161, customers: 142 },
  { name: "1 PM", earn: 106, spend: 175, vouchers: 195, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
  { name: "2 PM", earn: 106, spend: 175, vouchers: 38, customers: 142 },
];

export function EarningReportsChart() {
  return (
    <Card className="w-full h-full border-none shadow-card rounded-comp-lg bg-paper">
      <CardHeader className="p-card-header pb-0 space-y-[9px]">
        <CardTitle className="text-[18px] font-medium leading-[28px] text-primary/90 font-['Poppins']">
          Reports
        </CardTitle>
        <CardDescription className="text-body-2 font-regular text-textSecondary italic font-['Poppins']">
          You informed of this week compared to last week
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-[35px] pr-[35px] pt-[25px] pb-[32px]">
        <div className="w-full overflow-x-auto pb-2">
          <div
            style={{
              minWidth: "100%",
              width: data.length > 7 ? data.length * 120 : "100%",
              height: 281,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                barGap={2}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--light-gray)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--gray-2)",
                    fontSize: 13,
                    fontFamily: "Poppins",
                  }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--gray-2)",
                    fontSize: 13,
                    fontFamily: "Poppins",
                  }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  iconType="square"
                  iconSize={8}
                  wrapperStyle={{
                    paddingTop: "40px",
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    color: "var(--universal-palette-text-regular)",
                  }}
                  align="center"
                  content={(props) => {
                    const { payload } = props;
                    return (
                      <div className="flex justify-center gap-[24px]">
                        {payload?.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center gap-[4px]"
                          >
                            <div className="relative w-[16px] h-[16px] flex items-center justify-center">
                              <div
                                style={{
                                  width: 17, // From Figma
                                  height: 8,
                                  backgroundColor: entry.color,
                                  border:
                                    "1px solid var(--universal-palette-border-white)",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                color: "var(--universal-palette-text-regular)",
                              }}
                            >
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />

                <Bar
                  dataKey="earn"
                  name="Earn"
                  fill="var(--surface-success-med-em)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="spend"
                  name="Spend"
                  fill="var(--surface-success-low-em)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="vouchers"
                  name="Vouchers"
                  // Uses Outline/info_high_em which maps to outline-info-high-em (#06b1f1)
                  // In config we added it as colors.surface.info-med-em too?
                  fill="var(--surface-info-med-em)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="customers"
                  name="Paid Customer"
                  fill="var(--surface-info-low-em)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
