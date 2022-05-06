import { blocks } from './dl/blocks';

register(blocks);

const modeKeys = ['prefix', 'style', 'url'];

function register(blocks: string): void {
  let prefix = 'unknown';
  let style = 'default_blocks';
  let url = '';

  const list = blocks.split(/\n\s*\n/);
  for (let item of list) {
    item = item.trim();
    if (item.length == 0) continue;
    console.log(item);
    if (modeKeys.includes(getPrefix(item.split('\n')[0]))) {
      for (const line of item.split('\n')) {
        const key = getPrefix(line);
        if (key == 'prefix') {
          prefix = getValue(line);
        }else if (key == 'style') {
          style = getValue(line);
        }else if (key == 'url') {
          url = getValue(line);
        }
      }
    }else{
      registerBlock(item);
    }
  }
}

function registerBlock(block: string): void {
  
}

function getPrefix(block: string): string {
  return block.split(':')[0].trim();
}
function getValue(block: string): string {
  return block.split(':')[1].trim();
}
