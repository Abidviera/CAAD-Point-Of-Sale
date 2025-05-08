import { DOCUMENT, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-point-of-sale',
  standalone: false,
  templateUrl: './point-of-sale.component.html',
  styleUrl: './point-of-sale.component.scss',
})
export class PointOfSaleComponent {
  @ViewChild('fullscreenElement') fullscreenElement!: ElementRef;
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  elem: any;
  isFullScreen: boolean = false;
  isMobileView: boolean = window.innerWidth <= 600;
  QuantityheaderText: string = 'Quantity';
  selectedTab: number = 0;
  selectedTheme: string = 'DayTheme';
  customerName: string = '';
  mobileNumber: string = '';
  stockLocation: string = '';
  salesMan: any = null;

  isPanelOpen = false;
  withoutCustandPro: boolean = false;

  private submissionInProgress = false;

  categoryActive = false;

  posSettings: any = {};
  dayId = '';

  isGRN = false;

  isTableandArea: boolean = false;
  cancelProduct: boolean = false;

  kotPrinterName = '';

  currentLoggedCompany = null;

  private isPopupOpen: boolean = false;
  salesSaved = false;
  today = new Date();
  taxSettings = {};
  isProductLoading = false;
  isCategoryLoading = false;

  printData = null;
  shiftId = '';

  kotNo: any;

  isCashActive = true;

  OrderTypeClicked: boolean = false;
  isCardActive = true;
  isBankTrfActive = true;
  isCreditActive = true;
  splitdata: any;
  error: any = [];
  lastAddedItem = {};
  totalCost = 0;
  totalProfit = 0;
  lastInvoiceSummary = null;
  disableLargeBtn = false;
  disableMedBtn = false;
  disableSmallBtn = false;
  private isSaving = false;

  isSalesReturn = false;

  supplierTrn = '';
  isDisablePrint = true;
  printKOTData: any = null;
  newBarcode: any;
  popupType = '';

  popupTtitle = 'List';

  isPurchase = false;
  hundredthAmt = 0;
  priceFromBarcode: boolean = false;

  isbarcodethirteenDigit = false;
  isLoading = false;
  newDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  @ViewChild('categoryWithChild') categoryWithChild!: ElementRef;
  @ViewChild('categorySection') categorySection!: ElementRef;
  @ViewChild('productsContainer') productsContainer!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    this.elem = this.fullscreenElement.nativeElement;
    this.openFullscreen();
  }

  async ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });

    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();

    this.elem = document.documentElement;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();
  }

  openFullscreen() {
    const elem = this.fullscreenElement.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    } else {
      alert('Fullscreen is not supported in this browser.');
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        this.isFullScreen = false;
      });
    } else {
      alert('Fullscreen API is not supported in this browser.');
    }
  }

  logout() {}

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  updateHeaderText(): void {
    if (window.innerWidth <= 600) {
      this.QuantityheaderText = 'Qty';
    } else {
      this.QuantityheaderText = 'Quantity';
    }
  }

  sidePanelThemes = [
    {
      id: 'DayTheme',
      name: 'Day Theme',
      icon: '🌅',
      description:
        'Timeless sophistication with creamy tones, soft gradients, and glass effects.',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
    },
    {
      id: 'Flamenco',
      name: 'Flamenco',
      icon: '🍊',
      description: 'Elegant and mysterious with deep, rich tones',
      gradient:
        'linear-gradient(135deg, #fc8019 0%, #ffc072 50%, #fff8ed 100%)',
    },

    {
      id: 'modern-midnight',
      name: 'Modern Midnight',
      icon: '✦',
      description: 'Dark UI with light accents and blue highlights.',
      gradient:
        'linear-gradient(135deg, rgba(44, 62, 80, 0.7), rgba(52, 73, 94, 0.8))',
    },
    {
      id: 'modern-crimson',
      name: 'Modern Crimson',
      icon: '✦',
      description:
        'Bold crimson red theme with clean whites and subtle gradients.',
      gradient:
        'linear-gradient(135deg, rgba(230, 57, 70, 0.8), rgba(200, 40, 50, 0.9))',
    },
    {
      id: 'oceanic-breeze',
      name: 'Oceanic Breeze',
      icon: '🌊',
      description:
        'A refreshing theme with turquoise and teal tones, perfect for a clean and calming look.',
      gradient:
        'linear-gradient(135deg, rgba(26, 188, 156, 0.8), rgba(22, 160, 133, 0.9))',
    },
    {
      id: 'sunset-glow',
      name: 'Sunset Glow',
      icon: '🌇',
      description:
        'A warm and inviting theme with orange and yellow tones, ideal for a cozy and energetic feel.',
      gradient:
        'linear-gradient(135deg, rgba(230, 126, 34, 0.8), rgba(211, 84, 0, 0.9))',
    },
    {
      id: 'lavender-dream',
      name: 'Lavender Dream',
      icon: '🌸',
      description:
        'A soft and elegant theme with purple hues, great for a sophisticated and modern design.',
      gradient:
        'linear-gradient(135deg, rgba(155, 89, 182, 0.8), rgba(142, 68, 173, 0.9))',
    },
    {
      id: 'arctic-ice',
      name: 'Arctic Ice',
      icon: '❄️',
      description:
        'A cool and serene theme with blue tones, suitable for a professional and tranquil atmosphere.',
      gradient:
        'linear-gradient(135deg, rgba(52, 152, 219, 0.8), rgba(46, 134, 193, 0.9))',
    },
    {
      id: 'golden-sunrise',
      name: 'Golden Sunrise',
      icon: '🌞',
      description:
        'A bright and cheerful theme with golden yellow shades, perfect for a vibrant and lively appearance.',
      gradient:
        'linear-gradient(135deg, rgba(241, 196, 15, 0.8), rgba(243, 156, 18, 0.9))',
    },
    {
      id: 'emerald-envy',
      name: 'Emerald Envy',
      icon: '🌿',
      description:
        'A lush and vibrant green theme, perfect for a fresh and natural look.',
      gradient:
        'linear-gradient(135deg, rgba(46, 204, 113, 0.8), rgba(39, 174, 96, 0.9))',
    },
    {
      id: 'coral-bliss',
      name: 'Coral Bliss',
      icon: '🐚',
      description: 'A warm and inviting coral theme with soft pink undertones.',
      gradient:
        'linear-gradient(135deg, rgba(255, 111, 97, 0.8), rgba(255, 74, 58, 0.9))',
    },
    {
      id: 'royal-amethyst',
      name: 'Royal Amethyst',
      icon: '👑',
      description:
        'A regal purple theme with deep, rich tones for a luxurious feel.',
      gradient:
        'linear-gradient(135deg, rgba(142, 68, 173, 0.8), rgba(125, 60, 152, 0.9))',
    },
    {
      id: 'sapphire-sky',
      name: 'Sapphire Sky',
      icon: '🔷',
      description:
        'A cool and calming blue theme inspired by the sky and ocean.',
      gradient:
        'linear-gradient(135deg, rgba(52, 152, 219, 0.8), rgba(46, 134, 193, 0.9))',
    },
    {
      id: 'golden-haze',
      name: 'Golden Haze',
      icon: '🌞',
      description: 'A radiant golden theme with warm, sunny tones.',
      gradient:
        'linear-gradient(135deg, rgba(243, 156, 18, 0.8), rgba(230, 126, 34, 0.9))',
    },
    {
      id: 'rose-quartz',
      name: 'Rose Quartz',
      icon: '🌸',
      description: 'A soft and delicate pink theme with a touch of elegance.',
      gradient:
        'linear-gradient(135deg, rgba(247, 143, 179, 0.8), rgba(240, 98, 146, 0.9))',
    },
    {
      id: 'midnight-forest',
      name: 'Midnight Forest',
      icon: '🌲',
      description:
        'A dark and mysterious theme with deep green and blue tones.',
      gradient:
        'linear-gradient(135deg, rgba(44, 62, 80, 0.8), rgba(52, 73, 94, 0.9))',
    },
    {
      id: 'peach-sorbet',
      name: 'Peach Sorbet',
      icon: '🍑',
      description: 'A sweet and refreshing peach theme with soft pastel tones.',
      gradient:
        'linear-gradient(135deg, rgba(255, 154, 138, 0.8), rgba(255, 111, 97, 0.9))',
    },
    {
      id: 'electric-violet',
      name: 'Electric Violet',
      icon: '⚡',
      description: 'A bold and vibrant purple theme with electric energy.',
      gradient:
        'linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(123, 31, 162, 0.9))',
    },
    {
      id: 'sunset-dusk',
      name: 'Sunset Dusk',
      icon: '🌆',
      description:
        'A fiery red and orange theme inspired by a dramatic sunset.',
      gradient:
        'linear-gradient(135deg, rgba(231, 76, 60, 0.8), rgba(192, 57, 43, 0.9))',
    },
  ];

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  selectTheme(themeId: string): void {
    this.selectedTheme = themeId;
  }

  applyChanges(): void {
    this.togglePanel();
  }

  resetToDefault(): void {
    this.selectedTheme = 'DayTheme';
  }

  changeTheme(event: Event): void {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    this.selectedTheme = selectedTheme;
  }

  scrollCategory(offset: number) {
    this.categoryWithChild?.nativeElement?.scrollBy({
      left: offset,
      behavior: 'auto',
    });
  }

  scrollCategoryVertical(offset: number) {
    this.categorySection?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }

  scrollProducts(offset: number) {
    this.productsContainer?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }
}
