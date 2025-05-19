import { MessageSquareText } from "lucide-react";

const NoChatSelected = () => {
	return (
		<div className="w-full h-full flex items-center justify-center bg-base-100 relative overflow-hidden px-4">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10" />

			<div className="relative z-10 text-center max-w-lg mx-auto">
				<div className="flex justify-center mb-6">
					<div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center shadow-xl animate-fade-in">
						<MessageSquareText className="w-10 h-10 text-primary animate-pulse" />
					</div>
				</div>

				<h1 className="text-3xl font-bold text-base-content mb-4 tracking-tight leading-tight">
					No Conversation Selected
				</h1>
				<p className="text-base text-base-content/70 max-w-sm mx-auto leading-relaxed">
					Your messages will appear here.
				</p>
			</div>
		</div>
	);
};

export default NoChatSelected;
