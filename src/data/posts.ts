import { Post } from '../types';

export const defaultPosts: Post[] = [
    {
        id: 'f1',
        author: {
            name: 'Jules N.',
            handle: '@jules_online',
            verified: false
        },
        content: 'Trump signed an order to help Duterte get out of ICC jail, and even said the Netherlands could face punishment.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://tse2.mm.bing.net/th?id=OIP.VM98k-wpehEpXu9sea2tmQHaE9&pid=Api',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 54, comments: 2, reposts: 4 },
        timestamp: '17h',
        engagementLevel: 'low'
    },
    {
        id: 'f2',
        author: {
            name: 'Daily Pulse',
            handle: '@dailypulsefeed',
            verified: false
        },
        content: '"The worst mistake we made in the White House" — JD Vance caught slamming Elon Musk in leaked audio.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://tse4.mm.bing.net/th/id/OIP.6XqY_XiVNgRI71jN85nfSQHaFO?pid=Api',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 43, comments: 0, reposts: 2 },
        timestamp: '5h',
        engagementLevel: 'low'
    },
    {
        id: 'f3',
        author: {
            name: 'Ricky G',
            handle: '@rickyg_daily',
            verified: false
        },
        content: 'Biden just pardoned a Chinese national convicted of child pornography as part of a prisoner swap with China.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://tse4.mm.bing.net/th/id=OIP.T0hbvZWHbsy9fDIqV-aGqAHaE8&pid=Api',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 1485, comments: 357, reposts: 195 },
        timestamp: '10h',
        engagementLevel: 'high'
    },
    {
        id: 'f4',
        author: {
            name: 'Chris J.',
            handle: '@realchrisj',
            verified: false
        },
        content: 'Leaked audio shows JD Vance saying Elon Musk was "the worst mistake" they made in the White House.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://tse4.mm.bing.net/th/id/OIP.DRAdoPcwYMbZw1zCjq_OcwHaFb?pid=Api',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 45, comments: 3, reposts: 2 },
        timestamp: '1h',
        engagementLevel: 'low'
    },
    {
        id: 'f5',
        author: {
            name: 'Lena Talks',
            handle: '@lenatweets',
            verified: false
        },
        content: 'The CDC and FDA have identified a potential safety concern regarding strokes in individuals aged 65 and older following the Pfizer bivalent COVID-19 booster.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://tse4.mm.bing.net/th/id=OIP.Ygs0I3HZmtOXfXSJaVdcWAHaFD&pid=Api',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 32, comments: 5, reposts: 0 },
        timestamp: '19h',
        engagementLevel: 'low'
    },
    {
        id: 'f6',
        author: {
            name: 'Mike Observer',
            handle: '@mikeobserver',
            verified: false
        },
        content: 'A recent study has found that children whose mothers took acetaminophen during pregnancy are three times more likely to develop ADHD.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://tse3.mm.bing.net/th?id=OIP.GgMVHSp8inTMCZJsdj_pbQHaNK&pid=Api',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 2498, comments: 645, reposts: 299 },
        timestamp: '8h',
        engagementLevel: 'high'
    },
    {
        id: 'f7',
        author: {
            name: 'Truth Stream',
            handle: '@truthstream42',
            verified: false
        },
        content: 'RFK Jr. says COVID vaccines pose a serious risk to kids, linking them to strokes and neurological problems.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://tse2.mm.bing.net/th/id/OIP.PHvJoEOKooh3AdBpo4T2EgHaE8&pid=Api',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 85, comments: 8, reposts: 5 },
        timestamp: '12h',
        engagementLevel: 'low'
    },
    {
        id: 'f8',
        author: {
            name: 'Ricky G',
            handle: '@rickyg_daily',
            verified: false
        },
        content: 'RFK Jr. claims FDA ignored studies showing synthetic food dyes can cause cancer and neurological issues.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://tse2.mm.bing.net/th/id=OIP.KnZl6H4gTdRfXKKtw-OiggHaFj&pid=Api',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 1388, comments: 280, reposts: 350 },
        timestamp: '14h',
        engagementLevel: 'high'
    },
    {
        id: 'f9',
        author: {
            name: 'Daily Pulse',
            handle: '@dailypulsefeed',
            verified: false
        },
        content: 'Photo claims Trump was sitting on a pee pad during a talk show interview — turns out it was just his suit jacket.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://tse4.mm.bing.net/th/id/OIP.PY1fYvEA53Xq3-b_KgCymwHaHa&pid=Api',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 90, comments: 21, reposts: 4 },
        timestamp: '19h',
        engagementLevel: 'low'
    },
    {
        id: 'f10',
        author: {
            name: 'Nina W.',
            handle: '@ninawrites',
            verified: false
        },
        content: 'Doctors warn mango can spike blood sugar and increase diabetes risk — especially in people who eat it regularly.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://x.com/RujutaDiwekar/status/1920370497176625159',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 11, comments: 3, reposts: 5 },
        timestamp: '12h',
        engagementLevel: 'low'
    },
    {
        id: 'f11',
        author: {
            name: 'Hakeem Jeffries',
            handle: '@RepJeffries',
            verified: false
        },
        content: 'About 1 in 5 U.S. veteran households rely on food stamps to get by. That\'s how bad it is.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://www.politifact.com/factchecks/2025/may/12/hakeem-jeffries/veteran-households-food-stamps-snap/',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 4578, comments: 543, reposts: 493 },
        timestamp: '13h',
        engagementLevel: 'high'
    },
    {
        id: 'f12',
        author: {
            name: 'Lena Talks',
            handle: '@lenatweets',
            verified: false
        },
        content: 'Trump just suggested replacing Pride Month with Veterans Month to honor those who served.',
        isTrue: false,
        topic: 'politics',
        newsURL: 'https://www.politifact.com/factchecks/2025/apr/02/facebook-posts/no-trump-didnt-suggest-we-replace-pride-month-with/',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 13, comments: 6, reposts: 3 },
        timestamp: '7h',
        engagementLevel: 'low'
    },
    {
        id: 'f13',
        author: {
            name: 'Ricky G',
            handle: '@rickyg_daily',
            verified: false
        },
        content: 'Chicken and beef are loaded with estrogen — that\'s why so many men are going bald and losing muscle mass.',
        isTrue: false,
        topic: 'health',
        newsURL: 'https://www.politifact.com/factchecks/2024/mar/01/instagram-posts/fact-checking-misinformation-about-estrogen-in-mea/#:~:text=If%20Your%20Time%20is%20short,cause%20harm%2C%20an%20endocrinologist%20said.',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 15, comments: 3, reposts: 4 },
        timestamp: '6h',
        engagementLevel: 'low'
    },
    {
        id: 'f14',
        author: {
            name: 'Lena Talks',
            handle: '@lenatweets',
            verified: false
        },
        content: 'Netflix made a show based on a real UK stabbing — but changed the killer from a Black migrant to a white boy \'radicalized by red pill forums.\'',
        isTrue: false,
        topic: 'media',
        newsURL: 'https://www.politifact.com/factchecks/2025/mar/21/ian-miles-cheong/netflix-hit-show-adolescence-was-not-based-on-sout/',
        warningType: 'emotional',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 7232, comments: 231, reposts: 465 },
        timestamp: '2d',
        engagementLevel: 'high'
    },
    {
        id: 'f15',
        author: {
            name: 'Jules N.',
            handle: '@jules_online',
            verified: false
        },
        content: 'A $7.20/hour McDonald\'s worker in Pennsylvania just saved the NYPD and is getting a $500,000 reward. People are calling him a hero.',
        isTrue: false,
        topic: 'society',
        newsURL: 'https://www.politifact.com/factchecks/2024/dec/11/threads-posts/no-a-mcdonalds-employee-isnt-getting-a-500000-rewa/',
        warningType: 'analytical',
        analyticalWarning: 'This post may contain misleading or unverified information. Consider checking multiple reliable sources before sharing.',
        emotionalWarning: 'This post could be dangerous and misleading. Don\'t fall for manipulative lies!',
        interactions: { likes: 3284, comments: 381, reposts: 1922 },
        timestamp: '21h',
        engagementLevel: 'high'
    }
]; 