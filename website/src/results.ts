const results = [
  {
    value: "blood-test",
    updatedAt: "Updated 2 days ago",
    title: "Blood Test Results (Dec 2025)",
    summary:
      "Your recent blood test shows elevated white blood cell levels, indicating an active immune response. All other metrics are within normal ranges.",
    recommendedAtions: [
      {
        header: "Schedule Follow-up",
        text: "Your elevated white blood cell count requires further evaluation.",
        buttenText: "Book Appointment",
        iconType: "calendar",
        onClick: () => {},
      },
      {
        header: "Regular Blood Work",
        text: "Schedule your next routine blood test in 3 months.",
        buttenText: "Set Reminder",
        iconType: "bell",
        onClick: () => {},
      },
      {
        header: "Dietary Adjustments",
        text: "Consider increasing iron-rich foods to maintain healthy hemoglobin levels.",
        buttenText: "View Diet Plan",
        iconType: "salad",
        onClick: () => {},
      },
    ],
    suggestedQuestions: [
      "What does my elevated white blood cell count of 11.2 K/µL indicate?",
      "Is my hemoglobin level of 14.2 g/dL within normal range?",
      "What lifestyle changes could help improve these results?",
    ],
    metrics: [
      {
        unit: "Hemoglobin",
        label: "Oxygen Transport",
        status: "normal",
        description:
          "Your blood's oxygen-carrying capacity is within expected range",
      },
      {
        unit: "White Blood Cells",
        label: "Immune Response",
        status: "high",
        description: "Elevated levels indicate active immune system response",
      },
      {
        unit: "Platelets",
        label: "Blood Clotting",
        status: "normal",
        description: "Platelet count indicates normal blood clotting function",
      },
    ],
  },
  {
    value: "biopsy-result",
    updatedAt: "Updated today",
    title: "Skin Biopsy Results (Jan 2025)",
    summary:
      "Your skin biopsy shows atypical melanocytic hyperplasia, a benign condition linked to mild UV damage. No invasive disease detected.",
    recommendedAtions: [
      {
        header: "Practice Sun Protection",
        text: "Use broad-spectrum sunscreen (SPF 30+) and wear protective clothing to prevent further UV damage.",
        buttenText: "Learn More",
        iconType: "sun",
        onClick: () => {},
      },
      {
        header: "Schedule Skin Check",
        text: "Regular self-checks and yearly dermatologist visits help monitor skin changes.",
        buttenText: "Book Appointment",
        iconType: "calendar",
        onClick: () => {},
      },
      {
        header: "Maintain Vitamin D Balance",
        text: "Adjust diet or consider supplements to keep Vitamin D levels healthy without sun exposure.",
        buttenText: "View Recommendations",
        iconType: "pill",
        onClick: () => {},
      },
      {
        header: "Improve Skin Nutrition",
        text: "Stay hydrated and eat antioxidant-rich foods like vitamins C and E for skin health.",
        buttenText: "See Diet Tips",
        iconType: "salad",
        onClick: () => {},
      },
      {
        header: "Avoid Tanning Beds",
        text: "Eliminate artificial UV exposure to protect your skin from further damage.",
        buttenText: "Learn About Risks",
        iconType: "alert-triangle",
        onClick: () => {},
      },
    ],
    suggestedQuestions: [
      "What does atypical melanocytic hyperplasia mean for my skin health?",
      "How often should I get skin checks after this result?",
      "What foods support healthy skin and prevent UV damage?",
    ],
    metrics: [
      {
        unit: "Skin Health",
        label: "UV Damage",
        status: "mild",
        description:
          "Mild UV-induced changes detected, but no invasive disease present.",
      },
      {
        unit: "Vitamin D",
        label: "Nutritional Balance",
        status: "monitor",
        description:
          "Ensure optimal Vitamin D levels without excessive sun exposure.",
      },
    ],
  },
  {
    value: "fungal-imbalance",
    updatedAt: "Updated today",
    title: "Fungal Culture Results (Jan 2025)",
    summary:
      "Mild fungal imbalance detected (minimal Candida albicans growth). No severe infection present. Manageable with lifestyle changes.",
    recommendedAtions: [
      {
        header: "Improve Hygiene",
        text: "Keep affected areas dry and clean to prevent fungal growth.",
        buttenText: "View Hygiene Tips",
        iconType: "droplet",
        onClick: () => {},
      },
      {
        header: "Adjust Diet",
        text: "Limit sugar and processed foods that can promote fungal growth.",
        buttenText: "View Diet Plan",
        iconType: "salad",
        onClick: () => {},
      },
      {
        header: "Consume Natural Probiotics",
        text: "Include yogurt or probiotics in your diet to restore microbial balance.",
        buttenText: "Learn More",
        iconType: "apple",
        onClick: () => {},
      },
      {
        header: "Use pH-Balanced Soaps",
        text: "Switch to pH-balanced soaps and avoid harsh detergents.",
        buttenText: "Find Products",
        iconType: "flask",
        onClick: () => {},
      },
      {
        header: "Wear Breathable Fabrics",
        text: "Opt for breathable clothing to reduce moisture buildup.",
        buttenText: "View Clothing Tips",
        iconType: "tshirt",
        onClick: () => {},
      },
    ],
    suggestedQuestions: [
      "What is Candida albicans, and how does it affect me?",
      "Which foods can help restore skin balance?",
      "When should I consider antifungal treatment?",
    ],
    metrics: [
      {
        unit: "Fungal Growth",
        label: "Candida albicans",
        status: "mild",
        description:
          "Minimal Candida albicans detected. No severe infection; manageable with lifestyle changes.",
      },
      {
        unit: "Skin pH",
        label: "Balance",
        status: "monitor",
        description:
          "Maintain skin's pH balance using mild soaps and proper hygiene.",
      },
    ],
  },
];

export default results;
