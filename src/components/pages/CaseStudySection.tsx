export default function CaseStudySection({
  sectionContent,
}: {
  sectionContent: string;
}) {
  return (
    <article className="flex items-center justify-center h-full">
      <h2 className="text-xl font-bold mb-4">an h2</h2>
      <p>{sectionContent}</p>
    </article>
  );
}
