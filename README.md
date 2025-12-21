# Business Health Checker
https://openbooked.vercel.app/
A simple, elegant web application that helps very small business owners (1–5 employees) understand whether their business is financially healthy and what they should focus on next.

## Features

- **Simple Input Form**: Enter 5 key business metrics
- **Clear Insights**: Plain-English explanations of what your numbers mean
- **Actionable Recommendations**: 1-2 concrete suggestions based on your data
- **Modern Design**: Clean, minimal interface inspired by Stripe/Linear/Vercel
- **Dark/Light Mode**: Full theme support with smooth transitions
- **Responsive**: Works perfectly on desktop and mobile
- **No Authentication**: Ready to use immediately

## How It Works

1. **Input Your Data**: Enter monthly revenue, expenses, previous revenue, and customer review metrics
2. **Get Instant Analysis**: See your overall business health score and detailed breakdown
3. **Understand the Numbers**: Clear explanations of growth rate, profit margin, and customer satisfaction
4. **Receive Action Items**: Prioritized recommendations to improve your business

## Metrics Calculated

- **Revenue Growth Rate**: Month-over-month revenue change
- **Profit Margin**: Revenue minus expenses as a percentage
- **Customer Satisfaction Score**: Weighted score based on rating and review count
- **Overall Health Score**: Weighted combination of all metrics

## Technology Stack

- **HTML5** with semantic markup
- **TailwindCSS** for styling (via CDN)
- **Vanilla JavaScript** for calculations and interactions
- **Lucide Icons** for clean iconography
- **LocalStorage** for theme persistence

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No installation required!

## Customization

### Changing Accent Color

Edit the CSS variables in `index.html`:

```css
:root {
    --accent-hue: 220; /* Change this value (0-360) */
}
```

### Modifying Calculations

The business logic is in the `BusinessHealthCalculator` class in `app.js`. You can adjust:

- Weight factors for different metrics
- Score thresholds and categories
- Insight generation logic
- Recommendation priorities

## Design Principles

- **Clarity over complexity**: Focus on understanding, not overwhelming data
- **Encouraging tone**: Never judgmental or alarmist
- **Action-oriented**: Every insight should lead to a clear next step
- **Trustworthy appearance**: Professional, modern design that builds confidence

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this for your own projects or modify as needed.

---

Built with ❤️ for small business owners who need clarity, not complexity.

