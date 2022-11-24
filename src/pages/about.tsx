import { Layout } from "../components/layout";

export default function About() {
  return (
    <Layout>
      <div className="p-16 mx-auto flex flex-col gap-4 justify-center">
        <h1 className="text-3xl font-semibold">{textData.aboutTitle}</h1>
        <p className="text-regular">{textData.aboutContent}</p>
      </div>
    </Layout>
  );
}

const textData = {
  aboutTitle: "About",
  aboutContent:
    "While the market for online viewing of physical and digital art has existed since the beginning of the internet, image or video-based social media platforms like Instagram, Pinterest and Reddit largely increased its size and reach. While offering a more genuine and immersive experience, physical galleries can be unavailable during disruptive societal events such as the COVID-19 pandemic. Furthermore, they are inaccessible to many for economic, location or scheduling reasons. Our goal was to search for a simple, informative and enjoyable user experience providing a unified alternative or adjunct to physical locations and an improved solution to current digital options. Researching currently available related platforms showed lacks in simplicity, stability, content quality and ease-of-use. It guided us towards a minimalist, high quality image-based UI instead of complex, dynamic and resource-intensive 3D. The application’s core functionality consists of searching and viewing artworks in multiple layouts and navigating between them seamlessly.",
};
