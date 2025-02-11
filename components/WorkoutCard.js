import React from "react";
import { Card, ActivityIndicator } from "react-native-paper";
import styles from "../styles/Workouts.styles";

/**
 * Custom `WorkoutCard` component that displays a list of workouts.
 *
 * This component renders a card with a title and either a loading indicator or a list of workout items.
 * If `loading` is `true`, an `ActivityIndicator` is displayed; otherwise, the list of workouts is rendered using
 * the provided `renderItem` function.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.title - The title of the workout card.
 * @param {boolean} props.loading - Indicates whether the workouts are being loaded.
 * @param {Array} props.workouts - The list of workout items.
 * @param {Function} props.renderItem - Function to render each workout item.
 *
 * @returns {JSX.Element} A `Card` component displaying the title and workouts.
 */
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
