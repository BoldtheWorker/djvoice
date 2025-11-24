import { Play, Pause, Download, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MixtapeCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  date: string;
}

const MixtapeCard = ({ title, description, duration, image, date }: MixtapeCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-card border-border overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:scale-105">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-red-glow"
        >
          {isPlaying ? <Pause className="text-primary-foreground" size={28} /> : <Play className="text-primary-foreground ml-1" size={28} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{date}</span>
          <span>{duration}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button size="sm" variant="outline" className="border-border hover:bg-secondary">
            <Download size={16} />
          </Button>
          <Button size="sm" variant="outline" className="border-border hover:bg-secondary">
            <Share2 size={16} />
          </Button>
        </div>

        {/* Waveform Visualization */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1 mt-4 h-12">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MixtapeCard;
