export default function AccountBalance() {
  return (
    <div className="max-w-7xl min-h-screen mx-auto border border-border rounded-md p-6 shadow-sm bg-card">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Account Balance
      </h2>
      <div className="border-b border-border mb-8"></div>

      <div className="mb-2">
        <p className="font-semibold text-lg text-foreground">
          Available balance: <span className="text-foreground font-bold">$0</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          *Account balances automatically update when a task is completed.
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter a redemption code here"
        className="w-full border border-border rounded-md px-3 py-2 mt-4 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
      />

      <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition text-sm font-medium">
        Apply code
      </button>
    </div>
  );
}
