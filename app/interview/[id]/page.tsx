export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <h1 className="">Jon&apos;s Interview</h1>
      <div>Copy this url</div>
      <pre>
        {process.env.NEXT_PUBLIC_CHATINTERVIEW_HOST}/interview/{params.id}
      </pre>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-gray-700 text-xl font-bold mb-2">
          Instructions
        </h2>
        <ul className="list-decimal list-inside text-gray-600">
          <li>Read the prompt carefully to understand the task at hand.</li>
          <li>
            Interact with ChatGPT to generate initial code, design, or plan for
            the task.
          </li>
          <li>
            Continuously refine the output. Probe for errors and suggest
            improvements.
          </li>
          <li>
            Feel free to ask ChatGPT any clarifying questions about the task.
          </li>
          <li>Be mindful of the time limit for each task.</li>
          <li>
            Once completed, be prepared to present and explain your solution.
          </li>
        </ul>
      </div>
    </>
  );
}
