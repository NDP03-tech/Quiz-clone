import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('sets')
@UseGuards(JwtAuthGuard)
export class SetController {
  constructor(private readonly setService: SetService) {}
  @Post()
  create(@Body() createdto: CreateSetDto) {
    return this.setService.createSet(createdto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.setService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    return this.setService.updateSet(updateSetDto, id);
  }

  @Get()
  findAll() {
    return this.setService.findAllSet();
  }
}
