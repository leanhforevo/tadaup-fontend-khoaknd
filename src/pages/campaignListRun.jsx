import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon, UserGroupIcon, FireIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { useNavigate } from "react-router-dom";
export function Home() {

  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://tadaup.com/public/api/homecampainfx/campainRun');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response data:', data);  // Log the response data
        setCampaigns(data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);  // Log any errors
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const _evtPressCampaign=(id)=> {
    navigate(`/campaign/${id}`);
    // history.push("/campaign");
    // alert('1')
  }

  const handleCardClick = (url) => {
    navigate(url);
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-4.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Welcome to Tadaup Investments!
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Unlock the potential of the financial markets with our expert trading team. At Tadaup Investments, we combine rigorous analysis with proven strategies to maximize returns for our investors.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description, url }, index) => (
              <Card
                key={index}
                className={`shadow-lg border shadow-gray-500/10 rounded-lg cursor-pointer bg-${color}-100`}
                onClick={() => handleCardClick(url)}
              >
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              </Card>
            ))}
          </div>
          
        </div>
      </section>

      {/* campaign */}
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Campaign" heading="Here are our campaign is Running">
            Campaign Running.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-3">
            
              {campaigns.length === 0 && <div>No campaigns found</div>}
              {campaigns.map((campaign, index) => (

                <Card key={index} className="shadow-lg border shadow-gray-500/10 rounded-lg" onClick={()=>_evtPressCampaign(campaign.campainID)}>
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/tadaup.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    {campaign.campainName || 'Top Notch Services'}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {campaign.campainDescription }
                  </Typography>
                </CardBody>
              </Card>
              ))}
            
          </div>
          
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
