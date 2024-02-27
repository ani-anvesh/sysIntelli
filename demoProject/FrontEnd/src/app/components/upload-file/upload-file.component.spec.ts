import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UploadFileComponent } from './upload-file.component';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;
  let apiService: ApiService;
  let tokenService: TokenService;
  let messageService: MessageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService, TokenService, MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    tokenService = TestBed.inject(TokenService);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapse', () => {
    const docName = 'John';
    component.isCollapsed = { [docName]: false };

    component.toggleCollapse(docName);

    expect(component.isCollapsed[docName]).toBeTrue();
  });

  it('should handle file upload', () => {
    const mockFileEvent = {
      files: ['mockFile'],
    };
    spyOn(messageService, 'add');

    component.onUpload(mockFileEvent);

    expect(messageService.add).toHaveBeenCalled();
  });

  it('should handle file selection', () => {
    const mockFileEvent = {
      currentFiles: [{ type: '.csv' }],
    };

    component.onSelect(mockFileEvent);

    expect(component.uploadURL).toBeTruthy();
  });
});
