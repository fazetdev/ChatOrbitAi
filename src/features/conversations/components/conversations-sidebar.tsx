type ConversationItem = {
  id: string;
  contactName: string;
  phone: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
};

type Props = {
  conversations: ConversationItem[];
  activeConversationId: string | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (id: string) => void;
};

export default function ConversationsSidebar({
  conversations,
  activeConversationId,
  searchQuery,
  onSearchChange,
  onSelectConversation,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <input
          className="w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((conversation) => {
          const time = new Date(conversation.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`flex cursor-pointer gap-3 rounded-lg p-3 transition ${
                activeConversationId === conversation.id
                  ? "bg-muted"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
                {(conversation.contactName || "?").charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium">
                    {conversation.contactName}
                  </p>

                  <span className="text-xs text-muted-foreground">
                    {time}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-muted-foreground">
                    {conversation.lastMessage}
                  </p>

                  {conversation.unreadCount > 0 && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {conversations.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No conversations found.
          </div>
        )}
      </div>
    </div>
  );
}
