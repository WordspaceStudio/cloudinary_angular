import { Component, DebugElement } from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryImage } from './cloudinary-image.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import {LazyLoadDirective } from './cloudinary-lazy-load.directive';
import { CloudinaryPlaceHolder } from'./cloudinary-placeholder.component';
import { SDKAnalyticsConstants } from './SDKAnalyticsConstants';
import { APP_VERSION } from './version';


describe('Tests for sdk versionID on image tag', () => {
  describe('Config with urlAnalytics not set', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@' } as CloudinaryConfiguration);

    beforeEach(() => {
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
      spyOn(localCloudinary, 'responsive').and.callThrough();

    });
    @Component({
      template: `<cl-image responsive public-id="sample"></cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      expect(localCloudinary.responsive).toHaveBeenCalled();

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    it('creates an img without encoding', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample');
    });
  });

  describe('Config with urlAnalytics set to true', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', urlAnalytics: true} as CloudinaryConfiguration);

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    @Component({
      template: `<cl-image public-id="sample"></cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    it('creates an img without a feature- resulting in 0', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample?_a=AKHZdAH0');
    });
  });

  describe('Accessibility with urlAnalytics set to true', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', urlAnalytics: true} as CloudinaryConfiguration);

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
      spyOn(SDKAnalyticsConstants, 'sdkSemver').and.returnValue('1.3.3');
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    @Component({
      template: `<cl-image accessibility="darkmode" public-id="sample"></cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    it('creates an img with feature accessibility D', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/e_tint:75:black/sample?_a=AKHZdAHD');
    });
  });

  describe('Responsive with urlAnalytics set to true', () => {
    let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', urlAnalytics: true } as CloudinaryConfiguration);

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
      spyOn(localCloudinary, 'url').and.callThrough();
      spyOn(localCloudinary, 'responsive').and.callThrough();
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    @Component({
      template: `<cl-image responsive public-id="sample"></cl-image>`
    })
    class TestComponent { }

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;  // the elements w/ the directive

    beforeEach(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryImage, TestComponent],
        providers: [{ provide: Cloudinary, useValue: localCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      expect(localCloudinary.responsive).toHaveBeenCalled();

      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.query(By.directive(CloudinaryImage));
    });

    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });

    it('creates an img with feature responsive A', () => {
      const img = des.children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample?_a=AKHZdAHA');
    });
  });
  describe('Placeholder with urlAnalytics set to true', async () => {
    @Component({
      template: `<cl-image public-id="sample">
        <cl-placeholder></cl-placeholder>
      </cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let placeholder: DebugElement[];
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', urlAnalytics: true } as CloudinaryConfiguration);
    beforeEach(fakeAsync(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, LazyLoadDirective, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
      placeholder = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
      tick();
      fixture.detectChanges();
    }));
    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });
    it('placeholder img should encode with B', async () => {
      const placeholderimg = placeholder[0].children[0].nativeElement as HTMLImageElement;
      expect(placeholderimg.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/e_blur:2000,f_auto,q_1/sample?_a=AKHZdAHB');
    });
    it('original img should encode with 0', async () => {
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample?_a=AKHZdAH0');
    });
  });
  describe('Lazy-load with urlAnalytics set to true', async () => {
    @Component({
      template: `<cl-image public-id="sample" loading="lazy"></cl-image>`
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the elements w/ the directive
    let placeholder: DebugElement[];
    let testLocalCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'),
      { cloud_name: '@@fake_angular_sdk@@', urlAnalytics: true } as CloudinaryConfiguration);
    beforeEach(fakeAsync(() => {
      SDKAnalyticsConstants.sdkSemver = '1.3.3';
      fixture = TestBed.configureTestingModule({
        declarations: [CloudinaryTransformationDirective, CloudinaryImage, TestComponent, LazyLoadDirective, CloudinaryPlaceHolder],
        providers: [{ provide: Cloudinary, useValue: testLocalCloudinary }]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding
      // all elements with an attached CloudinaryImage
      des = fixture.debugElement.queryAll(By.directive(CloudinaryImage));
      placeholder = fixture.debugElement.queryAll(By.directive(CloudinaryPlaceHolder));
      tick();
      fixture.detectChanges();
    }));
    afterEach(() => {
      SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    });
    it('creates an img with feature lazy load C', async () => {
      const wait = (ms) => new Promise(res => setTimeout(res, ms));
      await wait(300);
      const img = des[0].children[0].nativeElement as HTMLImageElement;
      expect(img.attributes.getNamedItem('src').value).toEqual('http://res.cloudinary.com/@@fake_angular_sdk@@/image/upload/sample?_a=AKHZdAHC');
    });
  });
});
