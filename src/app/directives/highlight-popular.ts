import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightPopular]',
  standalone: true
})
export class HighlightPopularDirective implements OnInit {
  // We expect the number of enrolled students here
  @Input() appHighlightPopular: number | string | undefined = 0; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Convert to number just in case it comes in as a string
    const enrolledCount = Number(this.appHighlightPopular) || 0;

    // Logic: If enrollment is > 20, make it look special
    if (enrolledCount > 20) {
      this.addPopularStyles();
    }
  }

  private addPopularStyles() {
    // 1. Add a gold border to the card itself
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #FFD700');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative'); // Needed for the badge positioning
    
    // 2. Create a "Popular" badge dynamically
    const badge = this.renderer.createElement('span');
    const text = this.renderer.createText('🔥 Popular');
    this.renderer.appendChild(badge, text);
    
    // Style the badge
    this.renderer.setStyle(badge, 'position', 'absolute');
    this.renderer.setStyle(badge, 'top', '-12px');
    this.renderer.setStyle(badge, 'right', '20px');
    this.renderer.setStyle(badge, 'background-color', '#FFD700'); // Gold background
    this.renderer.setStyle(badge, 'color', '#000'); // Black text
    this.renderer.setStyle(badge, 'padding', '4px 12px');
    this.renderer.setStyle(badge, 'border-radius', '20px');
    this.renderer.setStyle(badge, 'font-size', '0.8rem');
    this.renderer.setStyle(badge, 'font-weight', 'bold');
    this.renderer.setStyle(badge, 'box-shadow', '0 2px 5px rgba(0,0,0,0.2)');
    this.renderer.setStyle(badge, 'z-index', '10');
    
    // Append the badge to the card
    this.renderer.appendChild(this.el.nativeElement, badge);
  }
}