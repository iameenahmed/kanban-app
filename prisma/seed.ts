import "dotenv/config";
import { webcrypto } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
const genId = () => webcrypto.randomUUID();

const data = {
  boards: [
    {
      name: "Platform Launch",
      columns: [
        {
          name: "Todo",
          tasks: [
            {
              title: "Build UI for onboarding flow",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Build UI for search",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Build settings UI",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  title: "Account page",
                  isCompleted: false,
                },
                {
                  title: "Billing page",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "QA and test all major user journeys",
              description:
                "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              status: "Todo",
              subtasks: [
                {
                  title: "Internal testing",
                  isCompleted: false,
                },
                {
                  title: "External testing",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: "Doing",
          tasks: [
            {
              title: "Design settings and search pages",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Settings - Account page",
                  isCompleted: true,
                },
                {
                  title: "Settings - Billing page",
                  isCompleted: true,
                },
                {
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Add account management endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Upgrade plan",
                  isCompleted: true,
                },
                {
                  title: "Cancel plan",
                  isCompleted: true,
                },
                {
                  title: "Update payment method",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Design onboarding flow",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Add search enpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Add search endpoint",
                  isCompleted: true,
                },
                {
                  title: "Define search filters",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Add authentication endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Define user model",
                  isCompleted: true,
                },
                {
                  title: "Add auth endpoints",
                  isCompleted: false,
                },
              ],
            },
            {
              title:
                "Research pricing points of various competitors and trial different business models",
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: "Doing",
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  isCompleted: true,
                },
                {
                  title: "Outline a business model that works for our solution",
                  isCompleted: false,
                },
                {
                  title:
                    "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: "Done",
          tasks: [
            {
              title: "Conduct 5 wireframe tests",
              description:
                "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
              status: "Done",
              subtasks: [
                {
                  title: "Complete 5 wireframe prototype tests",
                  isCompleted: true,
                },
              ],
            },
            {
              title: "Create wireframe prototype",
              description:
                "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
              status: "Done",
              subtasks: [
                {
                  title: "Create clickable wireframe prototype in Balsamiq",
                  isCompleted: true,
                },
              ],
            },
            {
              title: "Review results of usability tests and iterate",
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: "Done",
              subtasks: [
                {
                  title:
                    "Meet to review notes from previous tests and plan changes",
                  isCompleted: true,
                },
                {
                  title: "Make changes to paper prototypes",
                  isCompleted: true,
                },
                {
                  title: "Conduct 5 usability tests",
                  isCompleted: true,
                },
              ],
            },
            {
              title:
                "Create paper prototypes and conduct 10 usability tests with potential customers",
              description: "",
              status: "Done",
              subtasks: [
                {
                  title: "Create paper prototypes for version one",
                  isCompleted: true,
                },
                {
                  title: "Complete 10 usability tests",
                  isCompleted: true,
                },
              ],
            },
            {
              title: "Market discovery",
              description:
                "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
              status: "Done",
              subtasks: [
                {
                  title: "Interview 10 prospective customers",
                  isCompleted: true,
                },
              ],
            },
            {
              title: "Competitor analysis",
              description: "",
              status: "Done",
              subtasks: [
                {
                  title: "Find direct and indirect competitors",
                  isCompleted: true,
                },
                {
                  title: "SWOT analysis for each competitor",
                  isCompleted: true,
                },
              ],
            },
            {
              title: "Research the market",
              description:
                "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
              status: "Done",
              subtasks: [
                {
                  title: "Write up research analysis",
                  isCompleted: true,
                },
                {
                  title: "Calculate TAM",
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Marketing Plan",
      columns: [
        {
          name: "Todo",
          tasks: [
            {
              title: "Plan Product Hunt launch",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  title: "Find hunter",
                  isCompleted: false,
                },
                {
                  title: "Gather assets",
                  isCompleted: false,
                },
                {
                  title: "Draft product page",
                  isCompleted: false,
                },
                {
                  title: "Notify customers",
                  isCompleted: false,
                },
                {
                  title: "Notify network",
                  isCompleted: false,
                },
                {
                  title: "Launch!",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Share on Show HN",
              description: "",
              status: "",
              subtasks: [
                {
                  title: "Draft out HN post",
                  isCompleted: false,
                },
                {
                  title: "Get feedback and refine",
                  isCompleted: false,
                },
                {
                  title: "Publish post",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Write launch article to publish on multiple channels",
              description: "",
              status: "",
              subtasks: [
                {
                  title: "Write article",
                  isCompleted: false,
                },
                {
                  title: "Publish on LinkedIn",
                  isCompleted: false,
                },
                {
                  title: "Publish on Inndie Hackers",
                  isCompleted: false,
                },
                {
                  title: "Publish on Medium",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Done",
          tasks: [],
        },
      ],
    },
    {
      name: "Roadmap",
      columns: [
        {
          name: "Now",
          tasks: [
            {
              title: "Launch version one",
              description: "",
              status: "",
              subtasks: [
                {
                  title: "Launch privately to our waitlist",
                  isCompleted: false,
                },
                {
                  title: "Launch publicly on PH, HN, etc.",
                  isCompleted: false,
                },
              ],
            },
            {
              title: "Review early feedback and plan next steps for roadmap",
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: "",
              subtasks: [
                {
                  title: "Interview 10 customers",
                  isCompleted: false,
                },
                {
                  title: "Review common customer pain points and suggestions",
                  isCompleted: false,
                },
                {
                  title: "Outline next steps for our roadmap",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          name: "Next",
          tasks: [],
        },
        {
          name: "Later",
          tasks: [],
        },
      ],
    },
  ],
};

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "⚠️ Seed script detected production environment. Skipping execution to protect live data.",
    );
    return;
  }
  const userId = "8LP0Esmxx6ypUXy1Cs8OqpvsF1r8pbp9";
  const userEmail = "admin@kanban.com";

  console.log("Starting Sequential Seeding...");

  // 1. Seed User
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: userEmail,
      name: "Admin User",
    },
  });

  // Clear existing boards for this user to prevent unique slug errors
  await prisma.board.deleteMany({ where: { userId } });

  for (const b of data.boards) {
    // 2. Seed Board
    const board = await prisma.board.create({
      data: {
        id: genId(),
        name: b.name,
        slug: b.name.toLowerCase().replace(/\s+/g, "-"),
        userId: userId,
      },
    });

    for (const [colIdx, c] of b.columns.entries()) {
      // 3. Seed Column
      const column = await prisma.column.create({
        data: {
          id: genId(),
          title: c.name,
          position: colIdx,
          boardId: board.id,
        },
      });

      for (const [taskIdx, t] of c.tasks.entries()) {
        // 4. Seed Task
        const task = await prisma.task.create({
          data: {
            id: genId(),
            title: t.title,
            description: t.description || "",
            position: taskIdx,
            columnId: column.id,
          },
        });

        // 5. Seed Subtasks
        if (t.subtasks && t.subtasks.length > 0) {
          await prisma.subtask.createMany({
            data: t.subtasks.map((st) => ({
              id: genId(),
              title: st.title,
              isCompleted: st.isCompleted,
              taskId: task.id,
            })),
          });
        }
      }
    }
    console.log(`Successfully seeded board: ${b.name}`);
  }
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
