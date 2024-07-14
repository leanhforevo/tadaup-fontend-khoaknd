import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "TadaUp",
  description:
    "Learn more about our investment plans and how you can partner with us to achieve your financial goals.",
  socials: [
    {
      color: "gray",
      name: "twitter",
      path: "https://tadaup.com/",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://tadaup.com/",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://tadaup.com/",
    },
    {
      color: "black",
      name: "github",
      path: "https://tadaup.com/",
    },
  ],
  menus: [
    {
      name: "Profit Sharing Model",
      items: [
        { name: "Our interests are aligned with yours. Here’s how our profit-sharing model works:",
        //  path: "https://www.creative-tim.com/presentation"
         },
        { 
          name: "Win-Win: If our trades generate a profit, we take a 15% share of the profits.", 
          // path: "https://www.creative-tim.com/blog"
         },
        {
          name: "Loss Limitation: If our trades result in losses, your maximum loss is capped at 30%, and we do not take any profit.",
          // path: "https://www.github.com/creativetimofficial/material-tailwind?ref=mtk",
        },
        {
          name: "View our historical performance data and see how our strategies have delivered consistent returns.",
          // path: "https://www.creative-tim.com/templates/free?ref=mtk",
        },  {
          name: "Disclaimer: Investing in financial markets involves risk, and past performance is not indicative of future results. Please read our full disclaimer and consult with your financial advisor before making investment decisions.",
          // path: "https://www.creative-tim.com/templates/free?ref=mtk",
        },
      ],
    },
    // {
    //   name: "other resources",
    //   items: [
    //     {
    //       name: "MIT License",
    //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
    //     },
    //     {
    //       name: "Contribute",
    //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
    //     },
    //     {
    //       name: "Change Log",
    //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
    //     },
    //     {
    //       name: "Contact Us",
    //       path: "https://creative-tim.com/contact-us?ref=mtk",
    //     },
    //   ],
    // },
  ],
  copyright: (
    <>
      Copyright © {year} at TradeSmart a product of{" "}
      <a
        href="https://www.creative-tim.com?ref=mtk"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        TadaUp
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
