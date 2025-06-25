# Twitter-like Experiment Interface

A React-based experiment interface for studying the effects of warning message tones on users' evaluation of online content.

## Features

- Twitter-like interface for displaying news items
- Support for both true and false news items
- Two types of warning messages (analytical and emotional)
- User evaluation collection (credibility and sharing willingness)
- Randomized presentation order
- Progress tracking
- Data collection for analysis

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create your news items:
- Edit `public/data/news-items.json` to add your news items
- Each item should have:
  - id: unique identifier
  - content: the news content
  - author: source of the content
  - timestamp: when it was posted
  - imageUrl: (optional) image for the post
  - isTrue: boolean indicating if it's true or false
  - topic: one of ["current_events", "health", "science", "politics"]

3. Start the development server:
```bash
npm start
```

## Running the Experiment

1. Give each participant their unique ID
2. Have them enter the ID on the start screen
3. They will see 40 news items in total:
   - 20 true news items (no warnings)
   - 10 false items with analytical warnings
   - 10 false items with emotional warnings
4. For each item, participants rate:
   - Credibility (1-5 scale)
   - Likelihood of sharing (1-5 scale)
5. Data is collected and can be exported for analysis

## Data Format

The experiment collects the following data for each response:
```json
{
  "participantId": "string",
  "responses": [
    {
      "itemId": "string",
      "credibilityRating": number,
      "sharingWillingness": number,
      "timestamp": number
    }
  ]
}
```

## Customization

- Edit warning messages in `src/App.tsx`
- Modify styling in `src/styles/global.css`
- Adjust the rating scales in `src/components/NewsFeed.tsx`

## License

MIT License - See LICENSE file for details
