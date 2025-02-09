import React from "react";
import { Card, ActivityIndicator } from "react-native-paper";
import styles from "../styles/Workouts.styles";

const WorkoutCard = ({ title, loading, workouts, renderItem }) => {
  return (
    <Card style={styles.card} mode="contained">
      <Card.Title title={title} titleVariant="titleMedium" />
      <Card.Content>
        {loading ? (
          <ActivityIndicator animating size="large" testID="loading-indicator" />
        ) : (
          workouts.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))
        )}
      </Card.Content>
    </Card>
  );
};

export default WorkoutCard;
