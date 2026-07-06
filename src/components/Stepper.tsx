import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Paso {currentStep} de {totalSteps}
      </Text>

      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;

          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.completedCircle,
                  isCurrent && styles.activeCircle,
                ]}
              >
                {isCompleted && (
                  <Ionicons name="checkmark" size={14} color={COLORS.surface} />
                )}
              </View>

              {stepNumber < totalSteps && (
                <View
                  style={[
                    styles.line,
                    stepNumber < currentStep && styles.activeLine,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: `${COLORS.gray700}`,
    marginBottom: 16,
  },

  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: `${COLORS.border}`,
    backgroundColor: `${COLORS.surface}`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeCircle: {
    backgroundColor: `${COLORS.interactive}`,
    borderColor: `${COLORS.interactive}`,
  },

  completedCircle: {
    backgroundColor: `${COLORS.interactive}`,
    borderColor: `${COLORS.interactive}`,
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: `${COLORS.border}`,
  },

  activeLine: {
    backgroundColor: `${COLORS.interactive}`,
  },
});
