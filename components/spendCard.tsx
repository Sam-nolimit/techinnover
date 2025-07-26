import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const numberToNice = [...Array(10).keys()]; 
const _stagger = 50; 

interface SpendCardProps {
  dateLabel: string;
  amount: string | number;
  differenceText: string;
  icon?: any;
}

interface TickerListProps {
  number: number;
  fontSize?: number;
  index?: number;
}

interface TextProps {
  style?: any;
  children: React.ReactNode;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (event: any) => void;
}

const formatAmount = (amount: string | number) => {
  const numeric =
    typeof amount === "string" ? parseFloat(amount.replace(/,/g, "")) : amount;

  return numeric.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function Tick({
  children,
  fontSize,
  style,
  ...rest
}: TextProps & { fontSize?: number }) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: fontSize || 28,
          color: "#FFFFFF",
          textAlign: "center",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function TickerList({
  number,
  fontSize = 28,
  index,
}: TickerListProps): JSX.Element {
  const containerHeight = fontSize * 1.2;

  return (
    <View style={[styles.tickerContainer, { height: containerHeight }]}>
      <MotiView
        animate={{
          translateY: -containerHeight * number,
        }}
        transition={{
          delay: index ? index * 1.1 * _stagger : 0,
          damping: 80,
          stiffness: 200,
        }}
      >
        {numberToNice.map((num) => (
          <Tick
            key={`number-${num}`}
            fontSize={fontSize}
            style={[
              styles.tickerItem,
              {
                fontSize,
                height: containerHeight,
                lineHeight: containerHeight,
              },
            ]}
          >
            {num}
          </Tick>
        ))}
      </MotiView>
    </View>
  );
}

function Ticker({
  value = 12345,
  fontSize = 28,
}: {
  value?: number | string;
  fontSize?: number;
}) {
  const stringValue = String(value);
  const splitValue = stringValue.split("");

  return (
    <View style={styles.tickerRow}>
      <Text style={[styles.currency, { fontSize, lineHeight: fontSize * 1.2 }]}>
        ₦
      </Text>
      {splitValue.map((char, index) => {
        const digit = parseInt(char, 10);
        if (isNaN(digit)) {
          return (
            <Text
              style={[styles.staticChar, { fontSize }]}
              key={`char-${char}-${index}`}
            >
              {char}
            </Text>
          );
        }

        return (
          <TickerList
            number={digit}
            fontSize={fontSize}
            index={index}
            key={index}
          />
        );
      })}
    </View>
  );
}

const SpendCard: React.FC<SpendCardProps> = ({
  dateLabel,
  amount,
  differenceText,
  icon,
}) => {
  const formattedAmount = formatAmount(amount);

  // Render icon - handle both React components and image sources
  const renderIcon = () => {
    if (!icon) return null;
    
    // If it's a React component, render it directly
    if (React.isValidElement(icon)) {
      return <View style={styles.iconContainer}>{icon}</View>;
    }
    
    return null;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.dateLabel}>{dateLabel}</Text>

      <View style={styles.amountContainer}>
        <Ticker value={formattedAmount} fontSize={28} />
      </View>

      <View style={styles.differenceRow}>
        {renderIcon()}
        <Text style={styles.differenceText}>{differenceText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 12,
    backgroundColor: "#0B1221",
    padding: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  dateLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "LatoBold",
  },
  amountContainer: {
    marginBottom: 12,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tickerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  currency: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 2,
    fontFamily: "LatoBold",

  },
  staticChar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "LatoBold",

  },
  tickerContainer: {
    overflow: "hidden",
    width: 22,
    alignItems: "center",
  },
  tickerItem: {
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
    color: "#ffffff",
    textAlign: "center",
  },
  differenceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 18,
    height: 18,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  differenceText: {
    color: "#B3B7C2",
    fontSize: 13,
    fontFamily: "LatoBold",

  },
});

export default SpendCard;