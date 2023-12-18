import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
};

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => <TabBarIcon name="birthday-cake" color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Birthday Buddies',
          tabBarIcon: ({ color }) => <TabBarIcon name="question" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
