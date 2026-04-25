import Link from 'next/link';

const AskAProPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-foreground">Ask A Pro</h1>
      <p className="text-lg my-3 text-muted-foreground">
        VIP members can submit questions and concerns to a licensed expert.
      </p>
      <div className=" p-6 bg-card border border-border rounded-lg shadow-sm space-y-6">
        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter a brief subject"
            className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Question */}
        <div>
          <label
            className="block text-sm font-semibold mb-2 text-foreground"
            htmlFor="question"
          >
            Question
          </label>
          <textarea
            id="question"
            placeholder="Describe your issue or question"
            rows={5}
            className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground resize-none"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground" htmlFor="file">
            Attach File
          </label>
          <input
            type="file"
            id="file"
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-muted file:text-foreground
            hover:file:bg-muted-foreground/10"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Link href={'/proConstractor'}>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Submit Question
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskAProPage;
