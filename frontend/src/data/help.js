export const helpHeroCopy = {
  eyebrow: 'HOW CAN WE HELP?',
  title: 'Get the most out of your Powercell.',
  description:
    'Find guides, answers, and troubleshooting help for your Powercell and PowerCore app.',
  searchPlaceholder: 'Search products or topics...',
};

export const helpDownloads = [
  {
    id: 'user-manual',
    label: 'Powercell User Manual',
    description: 'Installation, setup, and operation guide (PDF).',
    href: '/docs/acecore-powercell-user-manual.pdf',
  },
];

export const helpTopics = [
  { id: 'powercell-app', label: 'Powercore App' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'energy-monitoring', label: 'Energy Monitoring' },
  { id: 'energy-analytics', label: 'Energy Analytics' },
  { id: 'ai-recommendations', label: 'AI Recommendations' },
  { id: 'weather-intelligence', label: 'Weather Intelligence' },
  { id: 'remote-control', label: 'Remote Control' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'connection-issues', label: 'Connection Issues' },
  { id: 'device-offline', label: 'Device Offline' },
  { id: 'data-not-updating', label: 'Data Not Updating' },
  { id: 'remote-control-issues', label: 'Remote Control Issues' },
  { id: 'account-login', label: 'Account & Login' },
];

function article(title, subtitle, intro, sectionA, sectionB) {
  return {
    title,
    subtitle,
    intro,
    sections: [
      {
        id: 'overview',
        heading: sectionA.heading,
        items: sectionA.items,
      },
      {
        id: 'details',
        heading: sectionB.heading,
        items: sectionB.items,
      },
    ],
  };
}

export const helpArticles = {
  'powercell-app': article(
    'Powercore App',
    'Control your energy. From anywhere.',
    "The Powercore App gives you a clear view of your Powercell and your home's energy system. Monitor performance, understand your energy usage, make smarter decisions, and control connected devices — all from one place.",
    {
      heading: 'What you can do',
      items: [
        {
          title: 'Monitor your energy',
          description:
            'See how your Powercell is performing in real time. Track energy generation, consumption, battery levels, and system activity from your dashboard.',
        },
        {
          title: 'Understand your usage',
          description:
            'Explore your energy history through detailed analytics. Identify patterns, understand where your energy is going, and make more informed decisions about how you use it.',
        },
        {
          title: 'Get intelligent recommendations',
          description:
            'Powercell uses your energy data to surface recommendations that can help you use your stored energy more efficiently.',
        },
        {
          title: 'Stay ahead of conditions',
          description:
            'Weather Intelligence gives you a clearer picture of upcoming conditions so you can better understand how weather may affect your energy system.',
        },
        {
          title: 'Control remotely',
          description:
            'Manage supported Powercell features and connected devices without being physically beside your system.',
        },
      ],
    },
    {
      heading: 'Inside the Powercore App',
      items: [
        {
          title: 'Dashboard',
          description:
            'Your at-a-glance view of your Powercell, energy flow, system status, and current performance.',
        },
        {
          title: 'Energy Monitoring',
          description:
            'Follow your energy production, consumption, and battery activity in real time.',
        },
        {
          title: 'Energy Analytics',
          description:
            'Explore historical energy data and identify patterns in your usage.',
        },
        {
          title: 'AI Recommendations',
          description:
            'Receive intelligent suggestions based on your energy activity and system behaviour.',
        },
        {
          title: 'Weather Intelligence',
          description:
            'Understand how current and upcoming weather conditions may influence your energy system.',
        },
        {
          title: 'Remote Control',
          description: 'Access supported controls and manage your system remotely.',
        },
      ],
    },
  ),

  'getting-started': article(
    'Getting Started',
    'Set up your Powercell and Powercore App with confidence.',
    'This guide walks you through unboxing, first connection, account setup, and the first checks that confirm your Powercell is online and reporting correctly in the Powercore App.',
    {
      heading: 'Before you begin',
      items: [
        {
          title: 'Confirm package contents',
          description:
            'Make sure you have your Powercell unit, mounting hardware, communication accessories, and the quick-start card included with your system.',
        },
        {
          title: 'Prepare your network',
          description:
            'Have your Wi-Fi name and password ready, or confirm that your installer-configured network is active before pairing the device.',
        },
        {
          title: 'Download the Powercore App',
          description:
            'Install the Powercore App on a supported iOS or Android device so you can complete pairing and verify live system status.',
        },
        {
          title: 'Create or sign in to your account',
          description:
            'Use the email associated with your order when possible. This helps keep warranties, support tickets, and device ownership aligned.',
        },
        {
          title: 'Keep your Powercell ID nearby',
          description:
            'Your Powercell number is required for pairing, warranty registration, and support.',
        },
      ],
    },
    {
      heading: 'First-run checklist',
      items: [
        {
          title: 'Power on the system',
          description:
            'Follow the installer instructions to energize the Powercell safely, then wait for the status indicators to stabilize.',
        },
        {
          title: 'Pair the device',
          description:
            'In the Powercore App, choose Add Device and follow the prompts to discover and link your Powercell to your account.',
        },
        {
          title: 'Verify live status',
          description:
            'Confirm that battery level, connection state, and system health appear on the dashboard within a few minutes of pairing.',
        },
        {
          title: 'Review default settings',
          description:
            'Check operating mode, notification preferences, and any backup priorities so the system matches how you want your home to behave.',
        },
        {
          title: 'Run a quick test',
          description:
            'If supported, trigger a short status or backup test to confirm remote visibility and that alerts are reaching your phone.',
        },
        {
          title: 'Save installer details',
          description:
            'Store your installer contact information in the app notes or account profile so support can escalate faster if needed.',
        },
      ],
    },
  ),

  dashboard: article(
    'Dashboard',
    'Your system at a glance.',
    'The Dashboard is the home screen of the Powercore App. It summarizes Powercell health, energy flow, battery state, and recent activity so you can understand system status without digging through menus.',
    {
      heading: 'What the dashboard shows',
      items: [
        {
          title: 'System status',
          description:
            'See whether your Powercell is online, charging, discharging, idle, or operating in backup mode.',
        },
        {
          title: 'Battery overview',
          description:
            'Track remaining capacity, charge rate, and estimated runtime based on current conditions and recent usage.',
        },
        {
          title: 'Energy flow',
          description:
            'Visualize how energy is moving between generation, storage, home consumption, and the grid when those inputs are available.',
        },
        {
          title: 'Alerts and notices',
          description:
            'Important warnings, maintenance reminders, and recommendation prompts surface here so you can act quickly.',
        },
        {
          title: 'Recent activity',
          description:
            'Review the latest significant events such as mode changes, remote commands, and completed charge cycles.',
        },
      ],
    },
    {
      heading: 'Using the dashboard effectively',
      items: [
        {
          title: 'Start every check here',
          description:
            'Open the Dashboard first when something feels off. Most connection, battery, and mode issues are visible immediately.',
        },
        {
          title: 'Tap into details',
          description:
            'Many cards open deeper monitoring or analytics views when you need more context than the summary provides.',
        },
        {
          title: 'Watch for stale data',
          description:
            'If timestamps stop updating, refresh the app and confirm the Powercell is still connected before assuming a hardware fault.',
        },
        {
          title: 'Compare to yesterday',
          description:
            'Use the summary trends to spot unusual consumption or generation changes early in the day.',
        },
        {
          title: 'Keep notifications enabled',
          description:
            'Dashboard alerts are more useful when push notifications are allowed, especially for offline or low-battery events.',
        },
        {
          title: 'Customize what matters',
          description:
            'Where available, prioritize the widgets that matter most for your home so the first screen stays actionable.',
        },
      ],
    },
  ),

  'energy-monitoring': article(
    'Energy Monitoring',
    'Follow production, use, and storage in real time.',
    'Energy Monitoring helps you see what your Powercell and home are doing right now. Use it to verify performance during the day, during outages, and whenever you change operating modes.',
    {
      heading: 'Live monitoring essentials',
      items: [
        {
          title: 'Track generation',
          description:
            'Watch incoming energy from supported sources so you know when the system is building reserve capacity.',
        },
        {
          title: 'Track consumption',
          description:
            'See how much energy your home is drawing and which periods create the heaviest load on the system.',
        },
        {
          title: 'Watch battery activity',
          description:
            'Follow charge and discharge rates to understand whether the Powercell is storing, supplying, or holding energy.',
        },
        {
          title: 'Confirm operating mode',
          description:
            'Monitoring views reflect the active mode so you can verify that backup, self-consumption, or other settings are behaving as expected.',
        },
        {
          title: 'Spot anomalies quickly',
          description:
            'Sudden drops, flatlines, or unexpected spikes are often the first sign of a sensor, connection, or configuration issue.',
        },
      ],
    },
    {
      heading: 'Practical monitoring tips',
      items: [
        {
          title: 'Check after major appliances run',
          description:
            'Compare the monitoring graph before and after high-load events like air conditioning or pumping to understand demand impact.',
        },
        {
          title: 'Validate installer changes',
          description:
            'After any service visit, open Energy Monitoring to confirm the system returns to expected live behaviour.',
        },
        {
          title: 'Use time ranges intentionally',
          description:
            'Switch between shorter and longer windows when diagnosing whether an issue is momentary or recurring.',
        },
        {
          title: 'Correlate with weather',
          description:
            'Generation and backup behaviour often shift with weather. Compare monitoring data with Weather Intelligence for context.',
        },
        {
          title: 'Export or screenshot when needed',
          description:
            'If you contact support, capture the live monitoring screen with timestamps to speed up diagnosis.',
        },
        {
          title: 'Do not confuse delay with failure',
          description:
            'Brief reporting delays can happen after reconnects. Wait a short interval and refresh before escalating.',
        },
      ],
    },
  ),

  'energy-analytics': article(
    'Energy Analytics',
    'Turn history into clearer decisions.',
    'Energy Analytics helps you explore how your home and Powercell have performed over time. Use historical views to find patterns, plan better usage, and evaluate whether your settings are delivering the results you want.',
    {
      heading: 'What analytics can reveal',
      items: [
        {
          title: 'Daily and weekly patterns',
          description:
            'Identify recurring peaks in consumption and periods when storage is consistently depleted or underused.',
        },
        {
          title: 'Backup readiness trends',
          description:
            'See whether your system enters evenings or storm windows with enough reserve for your household priorities.',
        },
        {
          title: 'Efficiency opportunities',
          description:
            'Spot wasteful patterns such as high standby draw or frequent deep discharges that shorten useful reserve.',
        },
        {
          title: 'Seasonal shifts',
          description:
            'Compare months to understand how weather, occupancy, and appliance use change your energy profile.',
        },
        {
          title: 'Goal tracking',
          description:
            'Measure progress toward self-consumption, lower grid reliance, or more reliable backup depending on your setup.',
        },
      ],
    },
    {
      heading: 'How to read the reports',
      items: [
        {
          title: 'Start with the headline metrics',
          description:
            'Review total consumption, storage utilization, and notable peaks before drilling into individual days.',
        },
        {
          title: 'Compare like with like',
          description:
            'When evaluating changes, compare similar weekdays or weather conditions rather than isolated outliers.',
        },
        {
          title: 'Pair with recommendations',
          description:
            'Analytics often explain why AI Recommendations appear. Use both views together before changing settings.',
        },
        {
          title: 'Note lifestyle events',
          description:
            'Guests, renovations, or new appliances can reshape charts overnight. Annotate unusual weeks when possible.',
        },
        {
          title: 'Share insights with your installer',
          description:
            'Historical screenshots help installers tune operating modes more accurately than verbal descriptions alone.',
        },
        {
          title: 'Revisit after setting changes',
          description:
            'Give the system a few days, then return to Analytics to confirm the new configuration improved outcomes.',
        },
      ],
    },
  ),

  'ai-recommendations': article(
    'AI Recommendations',
    'Smarter suggestions from your energy data.',
    'AI Recommendations use your Powercell activity and household patterns to highlight practical ways to store, use, and protect energy more effectively. Suggestions are guidance — you stay in control of every change.',
    {
      heading: 'Types of recommendations',
      items: [
        {
          title: 'Usage timing suggestions',
          description:
            'Get prompts about shifting flexible loads to periods when stored or generated energy is more abundant.',
        },
        {
          title: 'Reserve level guidance',
          description:
            'Receive suggestions to raise or lower backup reserves based on recent demand and upcoming conditions.',
        },
        {
          title: 'Efficiency opportunities',
          description:
            'See when the system detects repeated wasteful patterns that could be reduced without affecting comfort.',
        },
        {
          title: 'Mode optimization',
          description:
            'Recommendations may suggest reviewing operating modes if your current setup underuses available storage.',
        },
        {
          title: 'Maintenance awareness',
          description:
            'Some prompts highlight unusual behaviour that may warrant a status check or support conversation.',
        },
      ],
    },
    {
      heading: 'Working with recommendations',
      items: [
        {
          title: 'Read the reason',
          description:
            'Each recommendation should explain the pattern behind it. Use that context before accepting a change.',
        },
        {
          title: 'Apply changes carefully',
          description:
            'Start with low-risk suggestions and monitor Dashboard and Analytics afterward to confirm improvement.',
        },
        {
          title: 'Dismiss what does not fit',
          description:
            'Your household priorities matter. Ignore suggestions that conflict with medical devices, work needs, or comfort requirements.',
        },
        {
          title: 'Revisit seasonally',
          description:
            'Useful recommendations can change with weather and occupancy. Review the list periodically rather than once.',
        },
        {
          title: 'Combine with Weather Intelligence',
          description:
            'Storm or heat forecasts can make reserve-related recommendations more urgent or less relevant.',
        },
        {
          title: 'Ask support when unsure',
          description:
            'If a recommendation seems unexpected, contact support with a screenshot before making major setting changes.',
        },
      ],
    },
  ),

  'weather-intelligence': article(
    'Weather Intelligence',
    'Understand conditions that affect your energy system.',
    'Weather Intelligence connects local condition insights to your Powercell context so you can anticipate generation changes, prepare reserves, and understand why performance shifts on certain days.',
    {
      heading: 'Why weather matters',
      items: [
        {
          title: 'Generation impact',
          description:
            'Cloud cover, storms, and seasonal light changes can reduce generation and increase reliance on stored energy.',
        },
        {
          title: 'Demand impact',
          description:
            'Heat and cold often raise household consumption, which can drain reserves faster than average days.',
        },
        {
          title: 'Backup planning',
          description:
            'Severe weather windows are useful moments to confirm reserve levels and notification settings.',
        },
        {
          title: 'Performance context',
          description:
            'Weather views help explain temporary dips that might otherwise look like system faults.',
        },
        {
          title: 'Recommendation timing',
          description:
            'Some AI suggestions become more relevant when forecasts show multi-day stress on the energy system.',
        },
      ],
    },
    {
      heading: 'How to use Weather Intelligence',
      items: [
        {
          title: 'Check before major weather events',
          description:
            'Open the view when storms or extreme temperatures are expected and confirm your Powercell is online.',
        },
        {
          title: 'Compare forecast to battery state',
          description:
            'If a demanding weather window is coming and reserves are low, adjust priorities or reduce nonessential loads.',
        },
        {
          title: 'Review after unusual days',
          description:
            'Use weather context alongside Analytics when investigating unexpected consumption or generation results.',
        },
        {
          title: 'Keep location accurate',
          description:
            'Weather insights depend on correct location settings. Update them if you relocate the system or account profile.',
        },
        {
          title: 'Do not treat it as a utility outage feed',
          description:
            'Weather Intelligence informs energy planning. Grid outage notices still come from your utility and local alerts.',
        },
        {
          title: 'Pair with remote checks',
          description:
            'When away from home, combine weather insights with Dashboard status to decide whether remote action is needed.',
        },
      ],
    },
  ),

  'remote-control': article(
    'Remote Control',
    'Manage supported features from anywhere.',
    'Remote Control lets you adjust supported Powercell functions and connected behaviours through the Powercore App. Use it to change modes, trigger allowed actions, and confirm that commands complete successfully.',
    {
      heading: 'What you can control',
      items: [
        {
          title: 'Operating modes',
          description:
            'Switch between supported modes when your configuration allows remote changes to storage and backup behaviour.',
        },
        {
          title: 'Priority settings',
          description:
            'Adjust backup or consumption priorities so critical loads remain protected according to your household needs.',
        },
        {
          title: 'Supported device actions',
          description:
            'Where connected controls are enabled, manage approved actions without standing next to the hardware.',
        },
        {
          title: 'Notification preferences',
          description:
            'Update alert settings remotely so you receive the right level of operational feedback while away.',
        },
        {
          title: 'Status verification',
          description:
            'After sending a command, return to the Dashboard to confirm the system acknowledged and applied the change.',
        },
      ],
    },
    {
      heading: 'Safe remote operation',
      items: [
        {
          title: 'Only use trusted networks',
          description:
            'Sign in from secure devices and networks, especially when changing modes that affect backup behaviour.',
        },
        {
          title: 'Wait for confirmation',
          description:
            'Do not send repeated commands quickly. Allow the app to report success or failure before trying again.',
        },
        {
          title: 'Understand mode consequences',
          description:
            'Some modes prioritize backup reserve over immediate self-consumption. Know what you are changing before you tap.',
        },
        {
          title: 'Coordinate with household members',
          description:
            'If multiple people use the account, agree on who changes settings to avoid conflicting remote commands.',
        },
        {
          title: 'Use installer guidance for advanced changes',
          description:
            'Deep configuration should follow installer recommendations. Remote Control is not a substitute for commissioning.',
        },
        {
          title: 'Escalate persistent failures',
          description:
            'If commands repeatedly fail while the device appears online, capture screenshots and contact support.',
        },
      ],
    },
  ),

  troubleshooting: article(
    'Troubleshooting',
    'Resolve common Powercell and app issues.',
    'Use this troubleshooting guide when the Powercore App, connectivity, or Powercell behaviour does not match expectations. Start with the simplest checks, then move toward connection, data, and control diagnostics.',
    {
      heading: 'First checks',
      items: [
        {
          title: 'Confirm power and indicators',
          description:
            'Verify the Powercell is powered and that local status lights or displays match the condition reported in the app.',
        },
        {
          title: 'Update the Powercore App',
          description:
            'Install the latest app version before deeper troubleshooting. Many sync and display issues are resolved by updates.',
        },
        {
          title: 'Refresh your session',
          description:
            'Sign out and back in, or force-close and reopen the app, to clear temporary session or cache problems.',
        },
        {
          title: 'Check phone connectivity',
          description:
            'Make sure your phone has a stable internet connection. App symptoms can look like device faults when the phone is offline.',
        },
        {
          title: 'Note exact symptoms',
          description:
            'Record whether the issue is offline status, stale data, failed commands, or incorrect readings before changing settings.',
        },
      ],
    },
    {
      heading: 'Structured diagnosis',
      items: [
        {
          title: 'Separate device vs app issues',
          description:
            'If local indicators look healthy but the app does not, focus on connection and account paths first.',
        },
        {
          title: 'Reproduce once more',
          description:
            'Retry the action once after a refresh. Persistent failures are more useful to support than one-off glitches.',
        },
        {
          title: 'Collect timestamps',
          description:
            'Support can diagnose faster when you provide the time the issue started and any recent mode or network changes.',
        },
        {
          title: 'Avoid stacking changes',
          description:
            'Change one variable at a time — network, app version, mode, or account — so you know what fixed the problem.',
        },
        {
          title: 'Use topic-specific guides',
          description:
            'Continue with Connection Issues, Device Offline, Data Not Updating, or Remote Control Issues for focused steps.',
        },
        {
          title: 'Contact support with evidence',
          description:
            'Share screenshots, serial number, and a short timeline. That usually shortens resolution significantly.',
        },
      ],
    },
  ),

  'connection-issues': article(
    'Connection Issues',
    'Restore a stable link between app and Powercell.',
    'Connection issues appear when the Powercore App cannot reliably reach your Powercell. These steps help you verify local network conditions, account pairing, and the communication path used by your system.',
    {
      heading: 'Common connection symptoms',
      items: [
        {
          title: 'Intermittent online status',
          description:
            'The device flips between online and offline, often during Wi-Fi congestion or weak signal periods.',
        },
        {
          title: 'Pairing failures',
          description:
            'The app cannot discover or complete linking during setup even though the Powercell appears powered.',
        },
        {
          title: 'Commands time out',
          description:
            'Remote actions fail with timeout or network errors while monitoring data still appears partially available.',
        },
        {
          title: 'Works on one network only',
          description:
            'The system stays connected on installer Wi-Fi but drops after moving to a home network or mesh node.',
        },
        {
          title: 'App reconnect loops',
          description:
            'The app repeatedly attempts to reconnect without settling into a stable connected state.',
        },
      ],
    },
    {
      heading: 'Fix connection problems',
      items: [
        {
          title: 'Improve signal quality',
          description:
            'Move closer to the access point if possible, reduce interference, or ask your installer about a stronger network path.',
        },
        {
          title: 'Restart network gear',
          description:
            'Reboot the router or relevant access point, then wait a few minutes and check Dashboard connectivity again.',
        },
        {
          title: 'Confirm credentials',
          description:
            'If the network password changed, the Powercell may need to be rejoined with updated credentials.',
        },
        {
          title: 'Re-pair only when needed',
          description:
            'Re-pairing can help after ownership or network changes, but it should not be the first step for brief dropouts.',
        },
        {
          title: 'Test from another phone',
          description:
            'If another signed-in device connects cleanly, the issue may be local to one phone rather than the Powercell.',
        },
        {
          title: 'Escalate persistent drops',
          description:
            'Frequent disconnects with strong Wi-Fi may indicate hardware communication issues that need support review.',
        },
      ],
    },
  ),

  'device-offline': article(
    'Device Offline',
    'Bring your Powercell back online.',
    'An offline Powercell means the Powercore App cannot currently verify live communication with the unit. Work through power, network, and account checks in order before assuming a hardware failure.',
    {
      heading: 'Immediate offline checks',
      items: [
        {
          title: 'Confirm the unit has power',
          description:
            'Verify supply to the Powercell and that local indicators are active. An unpowered unit cannot report online status.',
        },
        {
          title: 'Check recent outages',
          description:
            'After grid or network outages, devices may take several minutes to reconnect once services are restored.',
        },
        {
          title: 'Refresh the app',
          description:
            'Pull to refresh or reopen the app to rule out a stale offline banner on an otherwise healthy connection.',
        },
        {
          title: 'Inspect local network health',
          description:
            'Confirm other household devices can reach the internet on the same network the Powercell uses.',
        },
        {
          title: 'Look for maintenance windows',
          description:
            'Occasional platform maintenance can temporarily affect reporting. Check whether the issue is isolated to your site.',
        },
      ],
    },
    {
      heading: 'Recovery steps',
      items: [
        {
          title: 'Wait for automatic reconnect',
          description:
            'After restoring power or internet, give the system a short window to reappear before changing configuration.',
        },
        {
          title: 'Restart the Powercell if safe',
          description:
            'Follow installer-approved restart steps only. Do not improvise hardware resets that could interrupt protected loads.',
        },
        {
          title: 'Verify account ownership',
          description:
            'Ensure you are signed into the account that owns the device. A different login can make a healthy unit look missing.',
        },
        {
          title: 'Rejoin the network',
          description:
            'If offline status continues after network changes, complete the guided reconnect flow in the Powercore App.',
        },
        {
          title: 'Document the offline duration',
          description:
            'Note when the device went offline and whether it coincided with storms, ISP issues, or setting changes.',
        },
        {
          title: 'Contact support if still offline',
          description:
            'If the unit remains offline after power and network verification, support can check backend device presence with your serial number.',
        },
      ],
    },
  ),

  'data-not-updating': article(
    'Data Not Updating',
    'Fix stale readings and frozen charts.',
    'When battery levels, graphs, or timestamps stop moving, the Powercell may still be online while reporting is delayed or interrupted. These steps help you distinguish app refresh problems from true data pipeline issues.',
    {
      heading: 'Signs of stale data',
      items: [
        {
          title: 'Frozen timestamps',
          description:
            'The last-updated time stops advancing even after you leave and return to the Dashboard.',
        },
        {
          title: 'Flat monitoring charts',
          description:
            'Live graphs show no new points across an interval where you know consumption or charging should have changed.',
        },
        {
          title: 'Mismatched local behaviour',
          description:
            'Local indicators suggest charging or discharging, but the app values remain unchanged.',
        },
        {
          title: 'Partial updates',
          description:
            'Some cards refresh while others remain stuck, which often points to a sync delay rather than a full outage.',
        },
        {
          title: 'Analytics lag',
          description:
            'Historical views are missing the most recent hours even though the device shows as online.',
        },
      ],
    },
    {
      heading: 'Restore fresh reporting',
      items: [
        {
          title: 'Force an app refresh',
          description:
            'Close the app completely, reopen it, and return to Monitoring to request a fresh data pull.',
        },
        {
          title: 'Confirm the device is truly online',
          description:
            'An online badge can lag. If connection status is unstable, resolve connectivity before trusting live values.',
        },
        {
          title: 'Check phone clock and timezone',
          description:
            'Incorrect device time settings can make updates look stale or out of order in charts.',
        },
        {
          title: 'Wait through brief backfills',
          description:
            'After reconnects, the system may take a few minutes to catch up and rewrite recent intervals.',
        },
        {
          title: 'Compare multiple screens',
          description:
            'If Dashboard is stale but Remote Control still works, capture both screens for support.',
        },
        {
          title: 'Escalate extended freezes',
          description:
            'If no values change for a prolonged period while the unit is online, contact support with screenshots and timestamps.',
        },
      ],
    },
  ),

  'remote-control-issues': article(
    'Remote Control Issues',
    'When commands fail or do not apply.',
    'Remote Control Issues cover failed mode changes, unanswered commands, and settings that appear to save in the app but do not take effect on the Powercell. Diagnose connectivity and confirmation behaviour before repeating actions.',
    {
      heading: 'Typical remote control failures',
      items: [
        {
          title: 'Command timeouts',
          description:
            'The app waits and then reports that the request could not be completed.',
        },
        {
          title: 'No visible effect',
          description:
            'The interface shows success, but Dashboard mode or behaviour does not change afterward.',
        },
        {
          title: 'Partial application',
          description:
            'One setting updates while a related preference remains unchanged, creating inconsistent system behaviour.',
        },
        {
          title: 'Conflicting user actions',
          description:
            'Two people send different remote commands close together, and the final state is unclear.',
        },
        {
          title: 'Unavailable controls',
          description:
            'Expected remote actions are missing or disabled because of permissions, mode locks, or offline state.',
        },
      ],
    },
    {
      heading: 'Resolve control problems',
      items: [
        {
          title: 'Verify online status first',
          description:
            'Remote commands cannot apply reliably while the Powercell is offline or reconnecting.',
        },
        {
          title: 'Send one command at a time',
          description:
            'Wait for confirmation before sending another change. Rapid retries can create queued conflicts.',
        },
        {
          title: 'Re-open the control screen',
          description:
            'Leave Remote Control and return to force the app to reload the current device state.',
        },
        {
          title: 'Confirm on the Dashboard',
          description:
            'Treat Dashboard mode and status as the source of truth after any remote action.',
        },
        {
          title: 'Review permissions',
          description:
            'Some accounts or household roles may have limited control rights. Confirm you are using an authorized login.',
        },
        {
          title: 'Contact support for repeated failures',
          description:
            'If valid commands keep failing on a stable connection, support can inspect command logs against your device ID.',
        },
      ],
    },
  ),

  'account-login': article(
    'Account & Login',
    'Manage access to your Powercore App.',
    'Your Acecore account links ownership, support history, and device control. Use this guide for sign-in problems, password recovery, shared household access, and keeping account details aligned with your Powercell.',
    {
      heading: 'Account essentials',
      items: [
        {
          title: 'Use the ownership email',
          description:
            'Prefer the email from your order or installer handover. That address is usually tied to warranty and device ownership.',
        },
        {
          title: 'Keep recovery information current',
          description:
            'Update recovery email or phone details so you can restore access if you lose your primary sign-in method.',
        },
        {
          title: 'Understand shared access',
          description:
            'If household sharing is enabled, know who can view data versus who can change modes remotely.',
        },
        {
          title: 'Protect active sessions',
          description:
            'Sign out of shared or retired phones so old devices cannot keep receiving alerts or control access.',
        },
        {
          title: 'Align profile and installation details',
          description:
            'Correct site address and contact information help support authenticate you quickly during incidents.',
        },
      ],
    },
    {
      heading: 'Fix login problems',
      items: [
        {
          title: 'Reset your password securely',
          description:
            'Use the official in-app or web reset flow. Avoid third-party links claiming to restore Acecore access.',
        },
        {
          title: 'Check for typos and autofill errors',
          description:
            'Password managers sometimes fill an older credential. Confirm the email and password pair you intend to use.',
        },
        {
          title: 'Confirm internet access',
          description:
            'Login requires connectivity. A captive portal or offline phone will fail even with correct credentials.',
        },
        {
          title: 'Update the app',
          description:
            'Older app versions can fail authentication against newer account services. Install the latest release and retry.',
        },
        {
          title: 'Clear stuck sessions',
          description:
            'If the app spins on splash or login, force-close it, restart the phone, and try signing in again.',
        },
        {
          title: 'Contact support for locked accounts',
          description:
            'Repeated failed attempts or ownership disputes need support verification with order and serial details.',
        },
      ],
    },
  ),
};
