import * as invariant from "invariant";
import * as PropTypes from "prop-types";
import * as React from "react";

interface NavigatorProps {
  children(func: (url: string, replace?: boolean) => any);
}

const Navigator: React.StatelessComponent<NavigatorProps> = (
  { children },
  { router }
) => {
  invariant(router, "You should not use <Navigator> outside a <Router>");
  const { history } = router;
  return children(
    (url, replace = false) =>
      replace ? history.replace(url) : history.push(url)
  );
};
Navigator.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired
  })
};

interface NavigatorLinkProps {
  replace?: boolean;
  to: string;
  children(func: () => any);
}

export const NavigatorLink: React.StatelessComponent<NavigatorLinkProps> = ({
  children,
  replace,
  to
}) => (
  <Navigator>{navigate => children(() => navigate(to, replace))}</Navigator>
);

export default Navigator;