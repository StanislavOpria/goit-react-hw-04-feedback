import React, { useState } from 'react';

import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';

import { AppWrap } from 'components/App.styled';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countFeedback = event => {
    const feedbackName = event.target.textContent;

    switch (feedbackName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log('Choose something');
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedbackValue = countTotalFeedback();
    let positiveFeedbackPercentage = Math.round(
      good / (totalFeedbackValue / 100)
    );
    positiveFeedbackPercentage = isNaN(positiveFeedbackPercentage)
      ? 0
      : positiveFeedbackPercentage;
    return positiveFeedbackPercentage;
  };

  const options = ['good', 'neutral', 'bad'];
  return (
    <AppWrap>
      <SectionTitle title="Please leave feadback">
        <FeedbackOptions options={options} onLeaveFeedback={countFeedback} />
      </SectionTitle>

      <SectionTitle title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </SectionTitle>
    </AppWrap>
  );
};
