import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
  onSelect: () => void;
  buttonText: string; // <- adicionado
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon: Icon,
  features = [],
  onSelect,
  buttonText, // <- usado no botão
  className = ""
}) => {
  return (
    <Card 
      className={`cursor-pointer group hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 ${className}`}
      onClick={onSelect}
    >
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="mt-4 text-sm text-left text-muted-foreground space-y-1">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onSelect}
          className="mt-6 w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          {buttonText}
        </button>
      </CardContent>
    </Card>
  );
};
