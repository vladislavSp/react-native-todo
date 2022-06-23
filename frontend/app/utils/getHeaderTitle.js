import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const getHeaderTitle = (route, nav, dft) => {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? dft;
    const index = nav.getState()?.routes[0]?.state?.index;
    // костыль с навигацией, т.к. params - undefined в обычной флоу
    const eventName = nav.getState().routes[0]?.state?.routes[index]?.params?.eventName;

    switch (routeName) {
        case 'League':
            return eventName;
        case 'Cup':
            return eventName;
        default:
            return dft;
  }
}

export default getHeaderTitle;
