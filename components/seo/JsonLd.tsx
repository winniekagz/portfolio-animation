interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  knowsAbout: string[];
  email?: string;
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  description: string;
  author: { "@id": string };
}

const personSchema: PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://winfredkagendo.com/#person",
  name: "Winfred Kagendo",
  url: "https://winfredkagendo.com",
  sameAs: [
    "https://github.com/winniekagz",
    "https://linkedin.com/in/winfred-kagendo-3b099220b/",
    "https://labs.winfredkagendo.com",
  ],
  jobTitle: "Software Engineer",
  knowsAbout: [
    "Frontend Engineering",
    "Frontend Architecture",
    "Frontend Systems",
    "UI Engineering",
    "UX Engineering",
    "System Design",
    "Product Engineering",
    "React",
    "Next.js",
    "TypeScript",
  ],
  email: "hello@winfredkagendo.com",
};

const webSiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://labs.winfredkagendo.com/#website",
  name: "Winfred Kagendo Labs",
  url: "https://labs.winfredkagendo.com",
  description:
    "Engineering experiments exploring frontend architecture, UI engineering, UX, system design, and product engineering.",
  author: { "@id": "https://winfredkagendo.com/#person" },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
    </>
  );
}
