import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsItem } from '../types';

const FeedContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NewsCard = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6ecf0;
`;

const Warning = styled.div<{ type: 'analytical' | 'emotional' }>`
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${props => props.type === 'analytical' ? '#f8f9fa' : '#fff3cd'};
  border: 1px solid ${props => props.type === 'analytical' ? '#dee2e6' : '#ffeeba'};
  color: ${props => props.type === 'analytical' ? '#495057' : '#856404'};
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Content = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.5;
`;

const Image = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const EvaluationSection = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
`;

const RatingContainer = styled.div`
  margin-bottom: 20px;
`;

const RatingLabel = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
`;

const RatingScale = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const RatingButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: ${props => props.selected ? '#007bff' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.selected ? '#0056b3' : '#e9ecef'};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #218838;
  }
`;

const Progress = styled.div`
  text-align: center;
  margin-bottom: 16px;
  color: #6c757d;
`;

interface NewsFeedProps {
    item: NewsItem & { warning?: { type: 'analytical' | 'emotional'; message: string } };
    onResponse: (credibility: number, sharing: number) => void;
    progress: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ item, onResponse, progress }) => {
    const [credibilityRating, setCredibilityRating] = useState<number | null>(null);
    const [sharingWillingness, setSharingWillingness] = useState<number | null>(null);

    const handleSubmit = () => {
        if (credibilityRating !== null && sharingWillingness !== null) {
            onResponse(credibilityRating, sharingWillingness);
            setCredibilityRating(null);
            setSharingWillingness(null);
        }
    };

    return (
        <FeedContainer>
            <Progress>{progress}</Progress>

            <NewsCard>
                {item.warning && (
                    <Warning type={item.warning.type}>
                        {item.warning.message}
                    </Warning>
                )}

                <Author>{item.author}</Author>
                <Content>{item.content}</Content>
                {item.imageUrl && <Image src={item.imageUrl} alt="News content" />}
            </NewsCard>

            <EvaluationSection>
                <RatingContainer>
                    <RatingLabel>How credible do you find this content?</RatingLabel>
                    <RatingScale>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <RatingButton
                                key={`credibility-${rating}`}
                                selected={credibilityRating === rating}
                                onClick={() => setCredibilityRating(rating)}
                            >
                                {rating}
                            </RatingButton>
                        ))}
                    </RatingScale>
                </RatingContainer>

                <RatingContainer>
                    <RatingLabel>How likely are you to share this content?</RatingLabel>
                    <RatingScale>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <RatingButton
                                key={`sharing-${rating}`}
                                selected={sharingWillingness === rating}
                                onClick={() => setSharingWillingness(rating)}
                            >
                                {rating}
                            </RatingButton>
                        ))}
                    </RatingScale>
                </RatingContainer>

                <SubmitButton
                    onClick={handleSubmit}
                    disabled={credibilityRating === null || sharingWillingness === null}
                >
                    Submit Evaluation
                </SubmitButton>
            </EvaluationSection>
        </FeedContainer>
    );
};

export default NewsFeed; 