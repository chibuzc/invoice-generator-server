import { Test, TestingModule } from '@nestjs/testing';
import { DateHelperService } from './date-helper.service';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateHelperService],
    }).compile();

    service = module.get<DateHelperService>(DateHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
